import { Component, OnInit } from '@angular/core';
import { MyCreatedService } from '../../shared/my-created.service';
import { Event } from 'src/app/models/events';
import { LoginService } from 'src/app/shared/login.service';
import { EventosService } from 'src/app/shared/eventos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-created-events',
  templateUrl: './my-created-events.component.html',
  styleUrls: ['./my-created-events.component.css']
})
export class MyCreatedEventsComponent implements OnInit {
  public siClick : boolean = false;
  public misCreados: Event[];
  public eventSelected: Event
  public id_eventoSelect:number
  public borrado: Event
  public events: Event[]

  constructor(public misCreadosService:MyCreatedService, public loginService:LoginService, public homeService: EventosService, private toastr: ToastrService) { 
  }
  editor(){
    this.siClick = true  
  }

  showMyCreated(){
    let id_usuario = this.loginService.login.userId;
    this.misCreadosService.getMisCreados(id_usuario).subscribe((data:any)=>
    {
      this.misCreados = data.resultado
      console.log(this.misCreados);
      for (let event of this.misCreados) {
        console.log(event.titulo, event.urlFotoEvento)
        if(event.urlFotoEvento == null || event.urlFotoEvento == ''){
          event.urlFotoEvento = '../../../assets/img/deportes.jpg'
        }
      }     
    })
  }
  getIdEvento(id: number)
  {
    console.log(id)
    this.homeService.eventoId = id;
    console.log(this.homeService.eventoId)
  }

  saveId(id_evento:number){

    this.id_eventoSelect = id_evento
    console.log(this.id_eventoSelect)
  }
  deleteEvento(){
    console.log(this.id_eventoSelect);
    
    this.misCreadosService.deleteMiCreado(this.id_eventoSelect).subscribe((data:any)=>
    {
      this.borrado = data
      console.log(this.borrado);
    })
    this.showSuccess()
    this.showMyCreated()
  }

  showSuccess() {
    this.toastr.success('', 'Perfil actualizado',{timeOut:2000, positionClass:"toast-top-full-width"});
  }
  showError(){
    this.toastr.error('', 'Error al actualizar el perfil',{timeOut:2000, positionClass:"toast-top-full-width"});
  }
  ngOnInit(): void {
    this.showMyCreated()
  }

}
