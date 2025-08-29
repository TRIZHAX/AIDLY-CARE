
document.addEventListener('DOMContentLoaded', () => {
  const dark = document.getElementById('setDark');
  const hc = document.getElementById('setHC');
  const fs = document.getElementById('setFS');
  const layoutRadios = document.querySelectorAll('input[name="layout"]');

  const settings = JSON.parse(localStorage.getItem('settings') || '{"dark":false,"highContrast":false,"fontSize":16}');
  dark.checked = !!settings.dark;
  hc.checked = !!settings.highContrast;
  fs.value = settings.fontSize || 16;
  document.getElementById('fsVal').innerText = fs.value + 'px';

  const layout = localStorage.getItem('layout') || 'grid';
  layoutRadios.forEach(r=> r.checked = (r.value===layout));

  function applyAndSave(){
    const s = { dark: dark.checked, highContrast: hc.checked, fontSize: parseInt(fs.value,10) };
    localStorage.setItem('settings', JSON.stringify(s));
    document.documentElement.classList.toggle('dark', s.dark);
    document.documentElement.style.setProperty('--base-font-size', s.fontSize + 'px');
    document.body.classList.toggle('hc', s.highContrast);
  }

  dark.addEventListener('change', applyAndSave);
  hc.addEventListener('change', applyAndSave);
  fs.addEventListener('input', ()=>{
    document.getElementById('fsVal').innerText = fs.value + 'px';
    applyAndSave();
  });

  layoutRadios.forEach(r=> r.addEventListener('change', ()=>{
    localStorage.setItem('layout', r.value);
    alert('Layout saved: ' + r.value + '. Go to Home to see it.');
  }));
});
