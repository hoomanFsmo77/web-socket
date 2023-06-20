import './assets/style/app.scss';
//@ts-ignore
import Alpine from 'alpinejs'
import socket from "./components/socket";
//@ts-ignore
window.Alpine = Alpine
//@ts-ignore
Alpine.data('socket',socket)
Alpine.start()