'use strict';


// Declare app level module which depends on filters, and services
var devApp = angular.module('SMGDevApp', [
  'ngRoute',
  'ngAnimate',
  'ngCookies',
  'SMGDevApp.filters',
  'SMGDevApp.services',
  'SMGDevApp.directives',
  'SMGDevApp.controllers'
]).
config(['$routeProvider', '$translateProvider', function($routeProvider, $translateProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.when('/signup', {templateUrl: 'partials/signup.html', controller: 'SignupCtrl'});

  $routeProvider.when('/dash/:gameId', {templateUrl: 'partials/dash.html', controller: 'DashCtrl'});
  $routeProvider.when('/bugs', {templateUrl: 'partials/bugs.html', controller: 'BugsCtrl'});
  
  $routeProvider.when('/mygames', {templateUrl: 'partials/mygames.html', controller: 'MyGamesCtrl'});
  $routeProvider.when('/console', {templateUrl: 'partials/console.html', controller: 'ConsoleCtrl'});
  $routeProvider.when('/getstarted', {templateUrl: 'partials/getstarted.html', controller: 'GetStartedCtrl'});
  $routeProvider.when('/faq', {templateUrl: 'partials/faq.html', controller: 'FAQCtrl'});

  $routeProvider.when('/account', {templateUrl: 'partials/account.html', controller: 'AccountCtrl'});
  $routeProvider.when('/updateDetails', {templateUrl: 'partials/updateDetails.html', controller: 'UpdateDetailsCtrl'});
  $routeProvider.when('/changePassword', {templateUrl: 'partials/changePassword.html', controller: 'ChangePasswordCtrl'});
  $routeProvider.when('/logout', {templateUrl: 'partials/logout.html', controller: 'LogoutCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});

  $translateProvider.translations('en_US', {
    'DEVELOPERHOME': 'Developer Home',
    'LOGINTAB': 'Log In',
    'SIGNUPTAB': 'Sign Up',
    'HOMETAB': 'Home',
    'ACCOUNTTAB': 'Account',
    'LOGOUTTAB': 'Log Out',
    'MYGAMESTAB': 'Games',
    'DEVELOPERCONSOLETAB': 'Developer Console',
    'GETTINGSTARTEDTAB': 'Getting Started',
    'FAQTAB': 'FAQ',
    'EMAIL': 'Email:',
    'DEVELOPERID': 'Developer Id:',
    'PASSWORD': 'Password:',
    'FIRSTNAME': 'First Name:',
    'MIDDLENAME': 'Middle Name:',
    'LASTNAME': 'Last Name:',
    'NICKNAME': 'Nickname:',
    'USERIMAGEURL': 'User Image (URL):',
    'UPDATEDETAILS': 'Update Details',
    'CHANGEPASSWORD': 'Change Password',
    'DELETEACCOUNT': 'Delete Account',
    'DELETEACCOUNTBODY1': 'Are you sure you want to delete your developer account?',
    'DELETEACCOUNTBODY2': 'Your games will still exist and will be detached from this account.',
    'DELETEACCOUNTBODY3': 'This action cannot be undone.',
    'NEWPASSWORD': 'New Password:',
    'REPEATNEWPASSWORD': 'Repeat New Password:',
    'CURRENTNUMBEROFPLAYERS': 'Current Number of Players: ',
    'HUSTORICALNUMBEROFPLAYERS': 'Historical Number of Players: ',
    'BESTPLAYERID': 'Best Player (id): ',
    'LOGOUTVERIFY': 'Are you sure you want to log out?',
    'YES': 'Yes',
    'NO': 'No',
    'DASHBOARD': 'Dashboard',
    'BUGREPORT': 'Bug Report',
    'NEW': 'New',
    'GAMENAME': 'Game Name:',
    'DESCRIPTION': 'Description:',
    'URL': 'URL:',
    'WIDTH': 'Width:',
    'HEIGHT': 'Height:',
    'HASTOKENS': 'Has Tokens:',
    'ICON': 'Icon:',
    'ADDSCREENSCHOT': 'Add Screen Shot',
    'SUBMITGAME': 'Submit Game',
    'CANCEL': 'Cancel',
    'UPDATEGAME': 'Update Game',
    'DELETEGAME': 'Delete Game',
    'SCREENSHOT': 'Screen Shot:',
    'ADD': 'Add',
    'DELETEGAMEBODY1': 'Are you sure you want to delete this game?',
    'DELETEGAMEBODY2': 'This action cannot be undone.',
    'SEARCH': 'Search:',
    'SORTBY': 'Sort By:',
    'ORIGIN': 'origin',
    'GAMENAMESL': 'game name',
    'URLSL': 'url',
    'EDIT': 'Edit',
    'GAMENAMEBUTTON': 'Game Name',
    'GAMEURL': 'Game Url'
  });
 
  $translateProvider.translations('es', {
    'DEVELOPERHOME': 'Desarrollador Inicio',
    'LOGINTAB': 'Acceder',
    'SIGNUPTAB': 'Contratar',
    'HOMETAB': 'Casa',
    'ACCOUNTTAB': 'Cuenta',
    'LOGOUTTAB': 'Finalizar la Sesión',
    'MYGAMESTAB': 'Juegos',
    'DEVELOPERCONSOLETAB': 'Consola Desarrollador',
    'GETTINGSTARTEDTAB': 'Primeros Pasos',
    'FAQTAB': 'Preguntas Más Frecuentes',
    'EMAIL': 'Email:',
    'DEVELOPERID': 'Desarrollador de Identificación:',
    'PASSWORD': 'Contraseña:',
    'FIRSTNAME': 'Primer Nombre:',
    'MIDDLENAME': 'Segundo Nombre:',
    'LASTNAME': 'Apellido:',
    'NICKNAME': 'Apodo:',
    'USERIMAGEURL': 'Imagen del Usuario (URL):',
    'UPDATEDETAILS': 'Detalles de la Actualización',
    'CHANGEPASSWORD': 'Cambiar Contraseña',
    'DELETEACCOUNT': 'Eliminar Cuenta',
    'DELETEACCOUNTBODY1': '¿Está seguro de que desea eliminar su cuenta de desarrollador?',
    'DELETEACCOUNTBODY2': 'Seguirán existiendo Sus juegos y serán separados de esta cuenta.',
    'DELETEACCOUNTBODY3': 'Esta acción no se puede deshacer.',
    'NEWPASSWORD': 'Nueva Contraseña:',
    'REPEATNEWPASSWORD': 'Repita Nueva Contraseña:',
    'CURRENTNUMBEROFPLAYERS': 'Corriente Número de Jugadores: ',
    'HUSTORICALNUMBEROFPLAYERS': 'Histórico Número de Jugadores: ',
    'BESTPLAYERID': 'Mejor Jugador (identificación): ',
    'LOGOUTVERIFY': '¿Está seguro que desea cerrar la sesión?',
    'YES': 'Sí',
    'NO': 'No',
    'DASHBOARD': 'Salpicadero',
    'BUGREPORT': 'Informar de un Error',
    'NEW': 'Nuevo',
    'GAMENAME': 'Nombre del Juego:',
    'DESCRIPTION': 'Descripción:',
    'URL': 'URL:',
    'WIDTH': 'Ancho:',
    'HEIGHT': 'Altura:',
    'HASTOKENS': 'Tiene Tokens:',
    'ICON': 'Icono:',
    'ADDSCREENSCHOT': 'Añadir Captura de Pantalla',
    'SUBMITGAME': 'Presentar Juegos',
    'CANCEL': 'Cancelar',
    'UPDATEGAME': 'Actualizar Juego',
    'DELETEGAME': 'Eliminar Juego',
    'SCREENSHOT': 'Captura de Pantalla:',
    'ADD': 'Añadir',
    'DELETEGAMEBODY1': '¿Está seguro que desea eliminar este juego?',
    'DELETEGAMEBODY2': 'Esta acción no se puede deshacer.',
    'SEARCH': 'Búsqueda:',
    'SORTBY': 'Ordenado Por:',
    'ORIGIN': 'origen',
    'GAMENAMESL': 'nombre del juego',
    'URLSL': 'url',
    'EDIT': 'Editar'
  });

  $translateProvider.preferredLanguage('en_US');
  $translateProvider.determinePreferredLanguage();
}]);

