// ===============================================
// 🎯 SECTION À MODIFIER 
// ===============================================
// Ajoutez vos questions ici en suivant les exemples !

const questions = [
    // Exemple 1 - Question simple
    {
        question: "a quoi sert HTML ?",
        options: [
            " HTML sert à structurer le contenu d une page web", 
            "HTML sert a styliser une page web", 
            "HTML sert a supprimer une page web", 
            "HTML sert a ajouter une page web"
        ],
        answer: 0,
        author: "omar"
    },

    // Exemple 2 - Question avec image dans la question
    {
        question: "Quel est le logo de ce célèbre éditeur de code ?",
        image: {
            src: "https://code.visualstudio.com/assets/images/code-stable.png",
            alt: "Logo d'un éditeur de code",
            size: "logo" // Options: "small", "medium", "logo"
        },
        options: [
            "Sublime Text",
            "Visual Studio Code", 
            "Atom",
            "Notepad++"
        ],
        answer: 1,
        author: "Prof Exemple"
    },
    {   question: "quel est le logo de HTML?",
        options:[
            { text: " ", image: "images/logos/html_logo.png"},
            { text: " ", image: "images/logos/github-logo.png" },
            { text: " ", image: "images/logos/css.png"},
            { text: "  ", image: "images/logos/Git-Iogo.png" }

        ],
        answer: 0,
        author: "Omar"



    },
    // Exemple 3 - Question avec images dans les options
    {
        question: "Quelle propriété CSS permet de changer la couleur du texte ?",
        options: [
            { text: "text-color", image: null },
            { text: "font-color", image: null },
            { text: "color", image: null },
            { text: "text-style", image: null }
        ],
        answer: 2,
        author: "Prof Exemple"
    },

    // Exemple 4 - Question avec capture d'écran
    {
        question: "À quoi correspond cette structure de dossiers ?",
        image: {
            src: "images/screenshots/project_screenshot.png",
            alt: "Structure de dossiers d'un projet web",
            size: "medium"
        },
        options: [
            "Projet React",
            "Projet HTML/CSS/JS classique",
            "Projet Node.js",
            "Projet WordPress"
        ],
        answer: 1,
        author: "Prof Exemple"
    },
    {
    question: "Quelle icône représente Git ?",
    options: [
        { text: "Option A", image: "images/logos/vercel.png"},
        { text: "Option B", image: "images/logos/github-logo.png" },
        { text: "Option C", image: "images/logos/css.png"},
        { text: "Option D", image: "images/logos/Git-Iogo.png" }
    ],
    answer: 3,
    author: "Prof Exemple"
},


    // Exemple 5 - 
    {
        question: "Quelle commande Git permet de sauvegarder les modifications ?",
        options: [
            "git save", 
            "git commit", 
            "git push", 
            "git add"
        ],
        answer: 1,
        author: "Prof Exemple"
    },
    // ------------------------- Omar -------------------------



    
    {
        question: "Dans quel cas la balise <img> en HTML affiche-t-elle le texte de l’attribut 'alt' à la place de l’image ?",
        options: [
            "Quand l’image se charge correctement",
            "Quand l’attribut 'alt' est vide",
            "Quand l’image ne peut pas être affichée",
            "Quand la balise <img> est placée dans le <head>"
        ],
        answer: 2,
        author: "SOUHAIL"
    },
    {
        question: "Que va afficher ce code JavaScript ?",
        image: {
            src: "images/screenshots/q1_javascript.png",
            alt: "Capture d'écran du code JavaScript",
            size: "small"
        },
        options: [
            "true",
            "false",
            "undefined",
            "Erreur"
        ],
        answer: 0,
        author: "SOUHAIL"
    },
    {
        question: "Quelle propriété CSS permet de centrer un texte à l’intérieur d’un élément ?",
        options: [
            "text-align",
            "center-text",
            "align-text",
            "font-center"
        ],
        answer: 0,
        author: "SOUHAIL"
    },
    {
        question: "À quoi sert la plateforme GitHub ?",
        options: [
            "À héberger des sites web uniquement",
            "À partager et collaborer sur du code avec Git",
            "À créer des images et des vidéos",
            "À apprendre le HTML uniquement"
        ],
        answer: 1,
        author: "SOUHAIL"
    },
    {
        question: "Quelle commande Git permet d’envoyer vos modifications sur un dépôt distant (par exemple sur GitHub) ?",
        options: [
            "git clone",
            "git pull",
            "git push",
            "git status"
        ],
        answer: 2,
        author: "SOUHAIL"
    },
    {
        question: "En JavaScript, que va afficher ce code ?",
        image: {
            src: "images/code.png", 
            alt: "Capture d'écran du code : console.log(typeof null);",
            size: "small"
        },
        options: [
            "'null'",
            "'object'",
            "'undefined'",
            "'number'"
        ],
        answer: 1,
        author: "SOUHAIL"
    },
    // --------------- Amine --------------
    {
        question: "a quoi sert CSS ?",
        options: [
            "  CSS sert à envoyer des sit web", 
            " CSS sert a styliser une page web", 
            " CSS sert a supprimer une page web",
            " CSS sert à rendre des des page web onligne ",
            ],
        answer: 0,
        author: "Amine"
    },
         {
    question: "Quelle icône représente Python ?",
    options: [
        { text: "Option A", image: "images/logos/vercel.png"},
        { text: "Option B", image: "images/logos/github-logo.png" },
        { text: "Option C", image: "images/logos/css.png"},
        { text: "Option D", image: "images/logos/py-logo.png"}
    ],
    answer: 3,
    author: "Amine"
},
        {
        question: "Quel est le nom de ce language de progrmmation ?",
        image: {
            src:"images/logos/js-logo.png",
            alt: "Logo d'un language de programmation",
            size: "logo" // Options: "small", "medium", "logo"
        },
        options: [
            "Edge",
            "Javascript", 
            "Github",
            "Python"
        ],
        answer: 1,
        author: "Prof Exemple"
    },

    {
        question: "Qu'est-ce que le déploiement ?",
        options: [
            "Écrire du code",
            "Installer un logiciel", 
            "Créer un site web",
            "Rendre une application disponible en ligne"
        ],
        answer: 4,
        author: "zakaria"
    },

    {
        question: "Quel est le nom de ce language de progrmmation ?",
        image: {
            src: "images/logos/html_logo.png",
            alt: "Capture d'écran du code html",
            size: "small"
        },
        options: [
             "html",
            "java scripte",
            "css",
            "c++"
        ],
        answer: 1,
        author: "zakaria"
    },

    { question: "Quelle icône représente vercel ?",
    options: [
        { text: "Option A", image: "images/logos/vercel.png"},
        { text: "Option B", image: "images/logos/github-logo.png" },
        { text: "Option C", image: "images/logos/css.png"},
        { text: "Option D", image: "images/logos/Git-Iogo.png" }
    ],
    answer: 1,
    author: "zakaria"
    },

    {
        question: "Que fait le code suivant ?",
        image: {
            src: "images/screenshots/Capture d’écran 2025-07-05 153225.png", 
            alt: "Capture d'écran du code : console.log(typeof null);",
            size: "meduim"
        },
        options: [
           "Affiche 'Bonjour'  dans la console",
            "Change le texte du bouton",
            "Ouvre une boîte d’alerte avec 'Bonjour'",
            " Ne fait rien"
        ],
        answer: 1,
        author: "zakaria"
    },

    // 👆 AJOUTEZ VOS NOUVELLES QUESTIONS ICI 👆
    // 
    // 📝 FORMATS POSSIBLES :
    // 
    // 1️⃣ QUESTION SIMPLE (sans image) :
    // {
    //     question: "Votre question ici ?",
    //     options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    //     answer: 0, // Index de la bonne réponse (0, 1, 2 ou 3)
    //     author: "Votre prénom"
    // }
    //
    // 2️⃣ QUESTION AVEC IMAGE :
    // {
    //     question: "Votre question avec image ?",
    //     image: {
    //         src: "chemin/vers/votre/image.png", // ou URL
    //         alt: "Description de l'image",
    //         size: "medium" // "small", "medium", "logo"
    //     },
    //     options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    //     answer: 1,
    //     author: "Votre prénom"
    // }
    //
    // 3️⃣ QUESTION AVEC IMAGES DANS LES OPTIONS :
    // {
    //     question: "Votre question ?",
    //     options: [
    //         { text: "Option 1", image: "chemin/image1.png" },
    //         { text: "Option 2", image: "chemin/image2.png" },
    //         { text: "Option 3", image: null }, // Pas d'image pour cette option
    //         { text: "Option 4", image: "chemin/image4.png" }
    //     ],
    //     answer: 0,
    //     author: "Votre prénom"
    // }
    //
    // 💡 CONSEILS :
    // - Utilisez des images hébergées en ligne (GitHub, imgur, etc.)
    // - Gardez les images légères (< 500KB)
    // - Choisissez la bonne taille : "logo" pour les petits logos, "small" pour les icônes, "medium" pour les captures d'écran
    // - N'oubliez pas de mettre votre prénom dans "author"
    //
    // 🚀 APRÈS AVOIR AJOUTÉ VOS QUESTIONS :
    // 1. git add questions.js
    // 2. git commit -m "Ajout question [SUJET] - [VOTRE PRÉNOM]"
    // 3. git push (ou créer une Pull Request)

];