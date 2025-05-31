// ===============================================
// 🎮 LOGIQUE DU QUIZ - NE PAS MODIFIER
// ===============================================

class Quiz {
    constructor() {
        this.currentAnswers = {};
        this.timeLeft = 600; // 10 minutes en secondes
        this.timerInterval = null;
        this.init();
    }

    init() {
        this.renderQuestions();
        this.updateProgress();
        this.startTimer();
        this.addEventListeners();
    }

    renderQuestions() {
        const container = document.getElementById('quiz-container');
        container.innerHTML = '';
        
        questions.forEach((q, index) => {
            const questionCard = document.createElement('div');
            questionCard.className = 'question-card';
            questionCard.style.animationDelay = `${index * 0.1}s`;
            
            // Construction du HTML de la question
            let questionHTML = `
                <div class="question-number">${index + 1}</div>
                <div class="question-text">${q.question}</div>
            `;

            // Ajout de l'image si elle existe
            if (q.image) {
                questionHTML += `
                    <img src="${q.image.src}" 
                         alt="${q.image.alt}" 
                         class="question-image ${q.image.size || 'medium'}"
                         onerror="this.style.display='none'">
                `;
            }

            // Construction des options
            questionHTML += '<div class="options">';
            
            q.options.forEach((option, optionIndex) => {
                // Gestion des options avec ou sans images
                let optionContent = '';
                if (typeof option === 'string') {
                    // Option simple (texte seulement)
                    optionContent = option;
                } else if (option.text) {
                    // Option avec texte et potentiellement image
                    optionContent = `
                        <span>${option.text}</span>
                        ${option.image ? `<img src="${option.image}" alt="${option.text}" class="option-image" onerror="this.style.display='none'">` : ''}
                    `;
                } else {
                    optionContent = option;
                }

                questionHTML += `
                    <div class="option" data-question="${index}" data-option="${optionIndex}">
                        <input type="radio" id="q${index}_${optionIndex}" name="q${index}" value="${optionIndex}">
                        <label for="q${index}_${optionIndex}">${optionContent}</label>
                    </div>
                `;
            });

            questionHTML += '</div>';

            // Ajout de l'auteur
            questionHTML += `<div class="author-credit">📝 Par ${q.author}</div>`;
            
            questionCard.innerHTML = questionHTML;
            container.appendChild(questionCard);
        });
    }

    addEventListeners() {
        // Gestion des clics sur les options
        document.addEventListener('click', (e) => {
            if (e.target.closest('.option')) {
                const option = e.target.closest('.option');
                const questionIndex = option.dataset.question;
                const optionIndex = option.dataset.option;
                
                // Retirer la sélection précédente pour cette question
                document.querySelectorAll(`[data-question="${questionIndex}"]`).forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Ajouter la nouvelle sélection
                option.classList.add('selected');
                option.querySelector('input').checked = true;
                
                this.currentAnswers[questionIndex] = parseInt(optionIndex);
                this.updateProgress();
            }
        });

        // Bouton de validation
        document.getElementById('submit-btn').addEventListener('click', () => {
            this.submitQuiz();
        });

        // Raccourci clavier pour valider (Ctrl+Enter)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                const submitBtn = document.getElementById('submit-btn');
                if (!submitBtn.disabled) {
                    this.submitQuiz();
                }
            }
        });
    }

    updateProgress() {
        const answered = Object.keys(this.currentAnswers).length;
        const total = questions.length;
        const percentage = (answered / total) * 100;
        
        document.getElementById('progress').style.width = `${percentage}%`;
        
        const submitBtn = document.getElementById('submit-btn');
        if (answered === total) {
            submitBtn.disabled = false;
            submitBtn.textContent = '✅ Valider le Quiz';
        } else {
            submitBtn.disabled = true;
            submitBtn.textContent = `📝 ${answered}/${total} questions répondues`;
        }
    }

    startTimer() {
        this.updateTimerDisplay();
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                this.submitQuiz();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const display = `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`;
        const timerElement = document.getElementById('timer');
        
        timerElement.textContent = display;
        
        // Alerte visuelle quand il reste moins d'une minute
        if (this.timeLeft <= 60) {
            timerElement.classList.add('critical');
        }
    }

    submitQuiz() {
        clearInterval(this.timerInterval);
        
        let score = 0;
        const detailedResults = [];

        questions.forEach((q, index) => {
            const userAnswer = this.currentAnswers[index];
            const isCorrect = userAnswer === q.answer;
            
            if (isCorrect) {
                score++;
            }

            detailedResults.push({
                question: q.question,
                userAnswer: userAnswer !== undefined ? q.options[userAnswer] : 'Non répondu',
                correctAnswer: q.options[q.answer],
                isCorrect: isCorrect,
                author: q.author
            });
        });

        this.displayResults(score, detailedResults);
    }

    displayResults(score, detailedResults) {
        const percentage = Math.round((score / questions.length) * 100);
        const resultDiv = document.getElementById('result');
        
        let resultClass, message, emoji;
        if (percentage >= 90) {
            resultClass = 'excellent';
            message = 'Excellent travail ! 🏆';
            emoji = '🏆';
        } else if (percentage >= 70) {
            resultClass = 'good';
            message = 'Très bien ! 🎉';
            emoji = '🎉';
        } else if (percentage >= 50) {
            resultClass = 'average';
            message = 'Pas mal ! 👍';
            emoji = '👍';
        } else {
            resultClass = 'needs-improvement';
            message = 'Il faut réviser ! 📚';
            emoji = '📚';
        }

        const timeSpent = 600 - this.timeLeft;
        const timeSpentFormatted = `${Math.floor(timeSpent / 60)}:${(timeSpent % 60).toString().padStart(2, '0')}`;

        resultDiv.className = `result ${resultClass}`;
        resultDiv.innerHTML = `
            <div style="font-size: 2em; margin-bottom: 20px;">${emoji}</div>
            <div style="margin-bottom: 20px;">${message}</div>
            
            <div class="stats">
                <div class="stat-card">
                    <span class="stat-number">${score}</span>
                    <small>Bonnes réponses</small>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${questions.length}</span>
                    <small>Questions total</small>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${percentage}%</span>
                    <small>Score final</small>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${timeSpentFormatted}</span>
                    <small>Temps écoulé</small>
                </div>
            </div>
            
            <div style="margin-top: 30px;">
                <button onclick="quiz.showDetailedResults()" style="
                    background: rgba(255,255,255,0.3);
                    border: 2px solid rgba(255,255,255,0.5);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 15px;
                    cursor: pointer;
                    font-size: 1em;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='rgba(255,255,255,0.4)'" 
                   onmouseout="this.style.background='rgba(255,255,255,0.3)'">
                    📊 Voir les détails
                </button>
                
                <button onclick="location.reload()" style="
                    background: rgba(255,255,255,0.3);
                    border: 2px solid rgba(255,255,255,0.5);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 15px;
                    cursor: pointer;
                    font-size: 1em;
                    margin-left: 10px;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='rgba(255,255,255,0.4)'" 
                   onmouseout="this.style.background='rgba(255,255,255,0.3)'">
                    🔄 Recommencer
                </button>
            </div>
        `;
        
        resultDiv.classList.remove('hidden');
        setTimeout(() => resultDiv.classList.add('show'), 100);
        
        // Désactiver les interactions
        document.querySelectorAll('input').forEach(input => input.disabled = true);
        document.getElementById('submit-btn').style.display = 'none';
        
        // Sauvegarder les résultats pour l'affichage détaillé
        this.detailedResults = detailedResults;
        this.finalScore = { score, percentage, timeSpent: timeSpentFormatted };
    }

    showDetailedResults() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            border-radius: 20px;
            padding: 30px;
            max-width: 80%;
            max-height: 80%;
            overflow-y: auto;
            position: relative;
            animation: slideIn 0.3s ease;
        `;

        let detailsHTML = `
            <h2 style="margin-bottom: 20px; color: #2c3e50;">📊 Résultats détaillés</h2>
            <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
                <strong>Score final : ${this.finalScore.score}/${questions.length} (${this.finalScore.percentage}%)</strong><br>
                <small>Temps : ${this.finalScore.timeSpent}</small>
            </div>
        `;

        this.detailedResults.forEach((result, index) => {
            const statusIcon = result.isCorrect ? '✅' : '❌';
            const statusColor = result.isCorrect ? '#48bb78' : '#e53e3e';
            
            detailsHTML += `
                <div style="margin-bottom: 20px; padding: 15px; border-left: 4px solid ${statusColor}; background: #f8f9fa; border-radius: 5px;">
                    <div style="font-weight: bold; margin-bottom: 10px;">
                        ${statusIcon} Question ${index + 1}
                    </div>
                    <div style="margin-bottom: 8px;"><strong>Q:</strong> ${result.question}</div>
                    <div style="margin-bottom: 8px;"><strong>Votre réponse:</strong> ${typeof result.userAnswer === 'string' ? result.userAnswer : result.userAnswer?.text || 'Non répondu'}</div>
                    <div style="margin-bottom: 8px;"><strong>Bonne réponse:</strong> ${typeof result.correctAnswer === 'string' ? result.correctAnswer : result.correctAnswer?.text || result.correctAnswer}</div>
                    <div style="font-size: 0.9em; color: #666;"><strong>Créé par:</strong> ${result.author}</div>
                </div>
            `;
        });

        detailsHTML += `
            <div style="text-align: center; margin-top: 30px;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                    background: linear-gradient(135deg, #4facfe, #00f2fe);
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 1.1em;
                    font-weight: bold;
                ">
                    Fermer
                </button>
            </div>
        `;

        content.innerHTML = detailsHTML;
        modal.appendChild(content);
        document.body.appendChild(modal);

        // Fermer en cliquant à l'extérieur
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Fermer avec Escape
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }
}

// Fonction utilitaire pour mélanger les questions (optionnel)
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// Fonction utilitaire pour mélanger les options d'une question (optionnel)
function shuffleOptions(question) {
    const shuffled = [...question.options];
    const originalAnswer = question.answer;
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        
        // Mettre à jour l'index de la bonne réponse
        if (i === originalAnswer) {
            question.answer = j;
        } else if (j === originalAnswer) {
            question.answer = i;
        }
    }
    
    question.options = shuffled;
}

// Validation des questions au chargement
function validateQuestions() {
    const errors = [];
    
    questions.forEach((q, index) => {
        // Vérification des champs obligatoires
        if (!q.question || !q.options || !q.author) {
            errors.push(`Question ${index + 1}: Champs manquants (question, options, author)`);
        }
        
        // Vérification du nombre d'options
        if (q.options && q.options.length !== 4) {
            errors.push(`Question ${index + 1}: Doit avoir exactement 4 options`);
        }
        
        // Vérification de l'index de réponse
        if (q.answer < 0 || q.answer >= (q.options?.length || 0)) {
            errors.push(`Question ${index + 1}: Index de réponse invalide (${q.answer})`);
        }
        
        // Vérification des images
        if (q.image && (!q.image.src || !q.image.alt)) {
            errors.push(`Question ${index + 1}: Image mal configurée (src et alt requis)`);
        }
    });
    
    if (errors.length > 0) {
        console.error('❌ Erreurs détectées dans les questions:');
        errors.forEach(error => console.error('  -', error));
        
        // Affichage d'une alerte pour les développeurs
        if (confirm('Des erreurs ont été détectées dans les questions. Voir la console pour plus de détails. Continuer quand même ?')) {
            return true;
        } else {
            return false;
        }
    }
    
    console.log('✅ Toutes les questions sont valides!');
    return true;
}

// Variable globale pour accéder au quiz depuis la console ou les boutons
let quiz;

// Démarrage du quiz au chargement de la page
window.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initialisation du Quiz de Programmation...');
    console.log(`📊 ${questions.length} questions chargées`);
    
    // Validation des questions
    if (!validateQuestions()) {
        document.body.innerHTML = `
            <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                font-family: 'Segoe UI', sans-serif;
                text-align: center;
                padding: 20px;
            ">
                <div style="
                    background: rgba(255,255,255,0.1);
                    padding: 40px;
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                ">
                    <h1>❌ Erreur de Configuration</h1>
                    <p>Des erreurs ont été détectées dans le fichier questions.js</p>
                    <p>Veuillez vérifier la console pour plus de détails.</p>
                    <button onclick="location.reload()" style="
                        background: white;
                        color: #667eea;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 25px;
                        font-weight: bold;
                        cursor: pointer;
                        margin-top: 20px;
                    ">
                        🔄 Recharger
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    // Démarrage du quiz
    quiz = new Quiz();
    
    // Message de bienvenue dans la console
    console.log('🎮 Quiz démarré avec succès!');
    console.log('💡 Astuce: Utilisez Ctrl+Enter pour valider rapidement');
});

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
    console.error('❌ Erreur dans le quiz:', e.error);
});

// Fonction utilitaire pour les développeurs
window.debugQuiz = {
    showAnswers: () => {
        console.log('🔍 Réponses du quiz:');
        questions.forEach((q, i) => {
            console.log(`${i + 1}. ${q.question}`);
            console.log(`   Réponse: ${q.options[q.answer]} (index: ${q.answer})`);
        });
    },
    
    autoComplete: () => {
        if (quiz) {
            questions.forEach((q, i) => {
                quiz.currentAnswers[i] = q.answer;
            });
            quiz.updateProgress();
            console.log('🤖 Quiz auto-complété avec les bonnes réponses');
        }
    },
    
    skipTimer: () => {
        if (quiz) {
            clearInterval(quiz.timerInterval);
            quiz.timeLeft = 5;
            quiz.startTimer();
            console.log('⏰ Timer accéléré à 5 secondes');
        }
    }
};