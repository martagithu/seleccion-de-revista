document.addEventListener('DOMContentLoaded', () => {
  const radioYes = document.querySelector('input[value="yes"]');
  const radioNo = document.querySelector('input[value="no"]');
  const cardYes = document.getElementById('opt-yes');
  const cardNo = document.getElementById('opt-no');

  const sectionResources = document.getElementById('section-resources');
  const sectionChecklist = document.getElementById('section-checklist');

  const chkItems = document.querySelectorAll('.chk-item');
  const resultBox = document.getElementById('result-box');

  const TOTAL_SCORE_POSSIBLE = 11; // Suma de todos los valores data-score

  // Alternancia entre las dos opciones principales
  radioYes.addEventListener('change', () => {
    cardYes.classList.add('active');
    cardNo.classList.remove('active');
    sectionChecklist.classList.remove('hidden');
    sectionResources.classList.add('hidden');
    calculateScore();
  });

  radioNo.addEventListener('change', () => {
    cardNo.classList.add('active');
    cardYes.classList.remove('active');
    sectionResources.classList.remove('hidden');
    sectionChecklist.classList.add('hidden');
  });

  // Recalcular puntuación cada vez que se cambia un checkbox
  chkItems.forEach(chk => {
    chk.addEventListener('change', calculateScore);
  });

  function calculateScore() {
    let currentScore = 0;
    let checkedCount = 0;

    chkItems.forEach(chk => {
      if (chk.checked) {
        currentScore += parseInt(chk.dataset.score || 1, 10);
        checkedCount++;
      }
    });

    if (checkedCount === 0) {
      resultBox.className = 'alert alert-info';
      resultBox.innerHTML = 'Por favor, marca las comprobaciones que cumple la revista para obtener un dictamen de riesgo.';
      return;
    }

    let percentage = (currentScore / TOTAL_SCORE_POSSIBLE) * 100;

    if (percentage >= 80) {
      resultBox.className = 'alert alert-success';
      resultBox.innerHTML = `<strong>Riesgo Bajo / Revista Recomendada (Puntuación: ${currentScore}/${TOTAL_SCORE_POSSIBLE})</strong><br>
        La revista cumple con los principales estándares de indexación, transparencia editorial y ausencia de prácticas depredadoras.`;
    } else if (percentage >= 50) {
      resultBox.className = 'alert alert-warning';
      resultBox.innerHTML = `<strong>Riesgo Moderado / Requiere Verificación Adicional (Puntuación: ${currentScore}/${TOTAL_SCORE_POSSIBLE})</strong><br>
        La revista cumple algunos criterios, pero faltan elementos clave de legitimidad o indexación. Revisa atentamente las métricas oficiales y el sitio web antes de realizar el envío.`;
    } else {
      resultBox.className = 'alert alert-danger';
      resultBox.innerHTML = `<strong>Riesgo Alto / Precaución Explícita (Puntuación: ${currentScore}/${TOTAL_SCORE_POSSIBLE})</strong><br>
        La revista presenta múltiples indicadores de riesgo o falta de transparencia. Podría tratarse de una revista depredadora, secuestrada o con prácticas editoriales dudosas.`;
    }
  }
});
