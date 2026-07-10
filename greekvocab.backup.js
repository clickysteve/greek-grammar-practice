/* Greek suite — unified cloud backup.
 * One secret GitHub gist holds ALL progress across the apps:
 *   - gvm_vocab_track   (vocab ratings, known words, custom words)
 *   - gvm_vocab_simple  (writing-prompt settings)
 *   - gvm_vocab_srs     (flashcard SRS schedule)
 *   - gvm_grammar       (grammar SRS progress + settings)
 *   - gvm_ratings / gvm_history / gvm_schedule  (verb practice)
 *   - gvm_streak        (daily streak)
 *
 * Reuses the existing token/gist stored in 'gvm_vocab_gh', so anyone already set up
 * keeps working. The combined backup file is 'greek-suite-progress.json'; on restore
 * it falls back to the legacy vocab-only file if that's all the gist has.
 *
 * Cross-device: on a new browser, paste the token AND the gist ID (from the gist's
 * URL) into the modal, then Restore. Auto-backup only ever PATCHes an existing gist
 * (it never creates one), and it skips the write if the gist holds a backup newer
 * than this browser's last one — so a stale device can't clobber a fresh backup.
 *
 * Usage: load this script on any page, then GVBackup.init() (sets up auto-backup) and
 * wire a button to GVBackup.openModal().
 */
window.GVBackup = (function () {
  'use strict';

  var GH_KEY = 'gvm_vocab_gh';
  var FILE = 'greek-suite-progress.json';
  var LEGACY_FILE = 'greek-vocab-progress.json';
  var KEYS = ['gvm_vocab_track', 'gvm_vocab_simple', 'gvm_grammar', 'gvm_ratings', 'gvm_history', 'gvm_schedule', 'gvm_vocab_srs', 'gvm_streak'];

  var gh = { token: '', gistId: '', lastBackup: 0 };
  try {
    var stored = JSON.parse(localStorage.getItem(GH_KEY) || '{}');
    if (stored && typeof stored === 'object') {
      gh.token = stored.token || ''; gh.gistId = stored.gistId || ''; gh.lastBackup = stored.lastBackup || 0;
    }
  } catch (e) {}
  function ghSave() { try { localStorage.setItem(GH_KEY, JSON.stringify(gh)); } catch (e) {} }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function collect() {
    var data = {};
    KEYS.forEach(function (k) {
      var raw = localStorage.getItem(k);
      if (raw == null) return;
      try { data[k] = JSON.parse(raw); } catch (e) { data[k] = raw; }
    });
    return { app: 'greek-suite', version: 1, exportedAt: new Date().toISOString(), data: data };
  }
  function apply(bundle) {
    if (!bundle || typeof bundle !== 'object') throw new Error('bad backup');
    // Combined format
    if (bundle.data && typeof bundle.data === 'object') {
      Object.keys(bundle.data).forEach(function (k) {
        if (KEYS.indexOf(k) === -1) return;
        var v = bundle.data[k];
        try { localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v)); } catch (e) {}
      });
      return;
    }
    // Legacy vocab-only file (the object IS the vocab track)
    try { localStorage.setItem('gvm_vocab_track', JSON.stringify(bundle)); } catch (e) {}
  }

  function ghApi(method, path, body) {
    return window.fetch('https://api.github.com' + path, {
      method: method,
      headers: { 'Authorization': 'Bearer ' + gh.token, 'Accept': 'application/vnd.github+json', 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined
    }).then(function (res) {
      if (!res.ok) throw new Error('GitHub said ' + res.status + (res.status === 401 ? ' (bad token?)' : ''));
      return res.json();
    });
  }

  // Timestamp of the backup currently in the gist (0 if none/unreadable).
  function remoteExportedAt() {
    if (!gh.gistId) return Promise.resolve(0);
    return ghApi('GET', '/gists/' + gh.gistId).then(function (g) {
      var f = (g.files || {})[FILE];
      if (!f || !f.content) return 0;
      try { return Date.parse(JSON.parse(f.content).exportedAt) || 0; } catch (e) { return 0; }
    }).catch(function () { return 0; });
  }

  function doBackup(silent) {
    var payload = { description: 'Greek learning suite — progress backup (greek.clickysteve.com)', files: {} };
    payload.files[FILE] = { content: JSON.stringify(collect(), null, 2) };
    var p = gh.gistId
      ? ghApi('PATCH', '/gists/' + gh.gistId, payload)
      : ghApi('POST', '/gists', Object.assign({ public: false }, payload));
    return p.then(function (g) {
      if (g && g.id) gh.gistId = g.id;
      gh.lastBackup = Date.now();
      ghSave();
      if (!silent) openModal('Backed up ✓ — vocab, grammar & verb progress.');
    }).catch(function (e) {
      if (!silent) openModal('Backup failed: ' + e.message);
    });
  }

  function backup(silent) {
    if (!gh.token) { if (!silent) openModal('Add a token first.'); return Promise.resolve(); }
    if (!silent) return doBackup(false);
    // Silent (auto) backups never create a gist and never overwrite a backup
    // that is newer than this browser's last one (made from another device).
    if (!gh.gistId) return Promise.resolve();
    return remoteExportedAt().then(function (remoteAt) {
      if (remoteAt > (gh.lastBackup || 0)) return; // remote is newer — leave it
      return doBackup(true);
    });
  }

  function restore() {
    if (!gh.token || !gh.gistId) { openModal('Add your token and the gist ID first.'); return; }
    ghApi('GET', '/gists/' + gh.gistId).then(function (g) {
      var files = g.files || {};
      var f = files[FILE] || files[LEGACY_FILE];
      if (!f || !f.content) throw new Error('no backup file found in the gist');
      if (!window.confirm('Replace ALL progress in this browser (vocab, grammar, verbs) with the cloud backup? The page will reload.')) return;
      apply(JSON.parse(f.content));
      openModal('Restored ✓ — reloading…');
      setTimeout(function () { window.location.reload(); }, 700);
    }).catch(function (e) { openModal('Restore failed: ' + e.message); });
  }

  function modalEl() {
    var m = document.getElementById('gvBackupModal');
    if (!m) { m = document.createElement('div'); m.id = 'gvBackupModal'; document.body.appendChild(m); }
    return m;
  }

  function openModal(status) {
    var hasToken = !!gh.token;
    var lastTxt = gh.lastBackup ? new Date(gh.lastBackup).toLocaleString() : 'never';
    var m = modalEl();
    m.innerHTML =
      '<div class="gvb-backdrop"></div>' +
      '<div class="gvb-panel"><button class="gvb-close" aria-label="Close">×</button>' +
      '<div class="gvb-title">Cloud backup — secret gist</div>' +
      '<p class="gvb-help">Backs up <strong>everything</strong> in one place: vocabulary, grammar SRS, and verb-practice progress. Create a <strong>classic</strong> personal access token with only the <code>gist</code> scope (GitHub → Settings → Developer settings → Tokens (classic)). It is stored only in this browser. Auto-backup runs on page load when the last one is over a day old.</p>' +
      '<p class="gvb-help"><strong>New device?</strong> Paste the same token and the gist ID (the long hex part of the gist URL), save, then hit Restore.</p>' +
      '<input type="password" id="gvbToken" class="gvb-input" placeholder="' + (hasToken ? 'token saved — paste here to replace' : 'ghp_…') + '" />' +
      '<input type="text" id="gvbGist" class="gvb-input" style="margin-top:8px;" placeholder="gist ID (auto-filled after first backup)" value="' + escapeHtml(gh.gistId || '') + '" />' +
      '<div class="gvb-status">Last backup: ' + escapeHtml(lastTxt) +
        (gh.gistId ? ' · <a href="https://gist.github.com/' + escapeHtml(gh.gistId) + '" target="_blank" rel="noopener">view gist</a>' : '') +
        (status ? '<div class="gvb-msg">' + escapeHtml(status) + '</div>' : '') + '</div>' +
      '<div class="gvb-btns">' +
        '<button id="gvbSave">Save token / gist ID</button>' +
        '<button id="gvbBackup"' + (hasToken ? '' : ' disabled') + '>Back up now</button>' +
        '<button id="gvbRestore"' + (gh.token && gh.gistId ? '' : ' disabled') + '>Restore</button>' +
        '<button id="gvbForget"' + (hasToken ? '' : ' disabled') + '>Forget token</button>' +
      '</div></div>';
    m.style.display = 'block';
    m.querySelector('.gvb-backdrop').addEventListener('click', close);
    m.querySelector('.gvb-close').addEventListener('click', close);
    document.getElementById('gvbSave').addEventListener('click', function () {
      var t = document.getElementById('gvbToken').value.trim();
      var gid = document.getElementById('gvbGist').value.trim();
      // Accept a full gist URL or a bare ID.
      var idMatch = gid.match(/([0-9a-f]{8,})\s*$/i);
      var changed = false;
      if (t) { gh.token = t; changed = true; }
      if (gid && idMatch) { gh.gistId = idMatch[1]; changed = true; }
      else if (!gid && gh.gistId) { /* leave existing gist id alone when field cleared by re-render */ }
      if (changed) { ghSave(); openModal('Saved.'); }
      else openModal('Nothing to save.');
    });
    document.getElementById('gvbBackup').addEventListener('click', function () { backup(false); });
    document.getElementById('gvbRestore').addEventListener('click', restore);
    document.getElementById('gvbForget').addEventListener('click', function () {
      gh.token = ''; ghSave(); openModal('Token forgotten (gist kept).');
    });
  }
  function close() { var m = modalEl(); m.style.display = 'none'; m.innerHTML = ''; }

  function ensureStyles() {
    if (document.getElementById('gvb-styles')) return;
    var css = '#gvBackupModal{position:fixed;inset:0;z-index:60;display:none}' +
      '.gvb-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.62)}' +
      '.gvb-panel{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:min(540px,calc(100vw - 32px));max-height:86vh;overflow-y:auto;background:var(--panel,#1b1f24);border:1px solid var(--border,#36404a);border-radius:20px;box-shadow:0 12px 34px rgba(0,0,0,.4);padding:22px;color:var(--text,#eef2f7)}' +
      '.gvb-close{position:absolute;top:12px;right:12px;width:34px;height:34px;padding:0;border-radius:10px;font-size:18px;border:1px solid var(--border,#36404a);background:var(--panel2,#232a31);color:var(--text,#eef2f7);cursor:pointer}' +
      '.gvb-title{font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted,#aab4c0);margin-bottom:10px}' +
      '.gvb-help{font-size:13px;color:var(--muted,#aab4c0);line-height:1.5;margin:0 0 12px}' +
      '.gvb-help strong{color:var(--text,#eef2f7)}.gvb-help code{background:rgba(255,255,255,.06);padding:1px 5px;border-radius:5px}' +
      '.gvb-input{width:100%;padding:10px 12px;border:1px solid var(--border,#36404a);background:#101419;color:var(--text,#eef2f7);border-radius:10px;font-size:14px}' +
      '.gvb-status{font-size:13px;color:var(--muted,#aab4c0);margin:10px 0}.gvb-status a{color:var(--accent,#ff9f43)}.gvb-msg{margin-top:6px;color:var(--text,#eef2f7)}' +
      '.gvb-btns{display:flex;flex-wrap:wrap;gap:8px}' +
      '.gvb-btns button{font-size:13px;padding:9px 12px;border:1px solid var(--border,#36404a);background:var(--panel2,#232a31);color:var(--text,#eef2f7);border-radius:10px;cursor:pointer}' +
      '.gvb-btns button:disabled{opacity:.4;cursor:default}';
    var st = document.createElement('style'); st.id = 'gvb-styles'; st.textContent = css; document.head.appendChild(st);
  }

  function init() {
    ensureStyles();
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.getElementById('gvBackupModal') && document.getElementById('gvBackupModal').style.display === 'block') close();
    });
    // Auto-backup: only when a gist already exists (never silently create one —
    // on a fresh device that would bind this browser to an empty backup and
    // strand the real one; see backup() for the freshness guard too).
    if (gh.token && gh.gistId && window.fetch && Date.now() - (gh.lastBackup || 0) > 24 * 3600 * 1000) backup(true);
  }

  return { init: init, openModal: openModal, backupNow: function () { return backup(true); } };
})();
