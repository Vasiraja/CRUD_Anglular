import { Component, OnInit } from '@angular/core';
import { ServService } from 'src/app/serv.service';
import { Router } from '@angular/router';
 @Component({
   selector: 'app-create',
   templateUrl: './create.component.html',
   styleUrls: ['./create.component.css'],
 })
 export class CreateComponent implements OnInit {
   name: string = '';
   class: string = '';
   phone: string = '';
   id: any | undefined;
   searchkey: any
   searchbarActive = false;
   searchitems: any[] = [];
   items: any[] = [];
   edit: boolean | undefined;
   editname: string = '';
   editclass: string = '';
   editphone: string = '';
   edititem: any[] = [];
   showmsg: boolean = false;
   msg: string = '';

   constructor(private service: ServService, private router: Router) {}
   ngOnInit(): void {
     this.get();
   }

   search(): void {
     this.service.search(this.searchkey).subscribe(
       (res) => {
         console.log(res);
         this.items = res;
       },
       (err) => {
         console.error(err);
       }
     );
   }

   add() {
     const data = {
       name: this.name,
       class: this.class,
       phone: this.phone,
     };

     this.service.create(data).subscribe(
       async(res) => {
         console.log(res);

       
      await new Promise((resolve) => {
        setTimeout(() => {
          this.showmsg = true;
          this.msg = this.name + ' Details Added Successfully';
        }, 1000);

                  this.showmsg = false;

      });
         
         
           this.router.routeReuseStrategy.shouldReuseRoute = () => false;
         this.router.onSameUrlNavigation = 'reload';
         this.router.navigate([this.router.url]);
         
         
         
       },
       (err) => {
         console.error(err);
       }
     );
   }

   get() {
     this.service.read().subscribe((res) => {
       this.items = res;

       console.log(this.items);
     });
   }
   getid(id: any) {
     this.service.readid(id).subscribe((res) => {
       this.edititem = res;
       this.editname = res[0].name;
       this.editclass = res[0].class;
       this.editphone = res[0].phone;
     });
   }

   del(id: any) {
     this.service.del(id).subscribe((res) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
       this.router.onSameUrlNavigation = 'reload';
       this.router.navigate([this.router.url]);
     });
   }

   editbar(item: any) {
     item.edit = !item.edit;
     this.getid(item.id);
   }

   update(id: any, item: any) {
     console.log(id);
     const data = {
       name: this.editname,
       class: this.editclass,
       phone: this.editphone,
     };

     this.service.edit(id, data).subscribe(
       (res) => {
         console.log(res);
         item.edit = false;
         alert(item.name + ' details updated successfully');
         this.router.routeReuseStrategy.shouldReuseRoute = () => false;
         this.router.onSameUrlNavigation = 'reload';
         this.router.navigate([this.router.url]);
       },
       (err) => {
         console.log(err);
       }
     );
   }
 }
