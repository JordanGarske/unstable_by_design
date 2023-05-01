import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.scss']
})
export class CreateActorComponent implements OnInit {
  owner?:String; 
  createFor?:String
   constructor(private route: ActivatedRoute,){}
   ngOnInit(): void {
    this.owner = String(this.route.snapshot.paramMap.get('ownerName'));
    const id =  Number(this.route.snapshot.paramMap.get('ownerID'));
    this.createFor =  String(this.route.snapshot.paramMap.get('createFor'));
    
  }
  
}