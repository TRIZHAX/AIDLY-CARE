document.addEventListener('DOMContentLoaded', () => {
  const dark = document.getElementById('setDark');
  const hc = document.getElementById('setHC');
  const fs = document.getElementById('setFS');
  const pc = document.getElementById('setPC');

  const settings = JSON.parse(localStorage.getItem('settings') || '{"dark":false,"highContrast":false,"fontSize":16,"pcMode":false}');
  dark.checked = !!settings.dark;
  hc.checked = !!settings.highContrast;
  fs.value = settings.fontSize || 16;
  pc.checked = !!settings.pcMode;
  document.getElementById('fsVal').innerText = fs.value + 'px';

  function applyAndSave() {
    const s = { 
      dark: dark.checked, 
      highContrast: hc.checked, 
      fontSize: parseInt(fs.value, 10), 
      pcMode: pc.checked 
    };
    localStorage.setItem('settings', JSON.stringify(s));
    document.documentElement.classList.toggle('dark', s.dark);
    document.documentElement.style.setProperty('--base-font-size', s.fontSize + 'px');
    document.body.classList.toggle('hc', s.highContrast);
    document.body.classList.toggle('pc-mode', s.pcMode);
  }

  dark.addEventListener('change', applyAndSave);
  hc.addEventListener('change', applyAndSave);
  pc.addEventListener('change', applyAndSave);
  fs.addEventListener('input', () => {
    document.getElementById('fsVal').innerText = fs.value + 'px';
    applyAndSave();
  });

  applyAndSave();
});
