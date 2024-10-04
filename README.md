# Bataille

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.6.

Choix techniques:

- Gameplay: En principe on part sur une "simulation" en tour par tour sans interactions avec des Apis ou un serveur avec des websockets.
  L'idée sera donc de jouer sur un seul écran avec pour seul interaction le clic bouton quand le joueur est invité à le faire.
  Toute la navigation se passe sur la même page, l'application n'étant pas conséquente, cela ne pose pas problème, dans un autre cas de figure on aurait pu utiliser plus le routing.
- Scss: un fichier de variable contenant les couleurs a été créé
- Reactive forms: utilisation des reactives forms pour la saisie des noms des joueurs et les vérifications avec Validators
- EsLint: Pour le formatage, code clean
- Ngx-bootstrap: pour le design des composants de base
