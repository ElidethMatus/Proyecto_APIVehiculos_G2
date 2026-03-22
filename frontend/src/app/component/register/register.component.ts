import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  usuario = {
    Nombre: '',
    Apellido: '',
    Correo: '',
    Password: '',
    Rol: 'Vendedor',
    Telefono: '',
    Estado: 'Activo',
    Username: ''
  };

  constructor(private userService: UserService) {}

  registrar() {
    this.userService.addUser(this.usuario).subscribe({
      next: () => {
        alert('Usuario registrado');
      },
      error: () => {
        alert('Error al registrar');
      }
    });
  }
}