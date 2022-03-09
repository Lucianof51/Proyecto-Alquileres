import { EmailComposer } from "@ionic-native/email-composer/ngx";

export interface Usuario {
    id: number;
    email: EmailComposer;
    password: string;
    nombre: string;
    apellido: string;
}
