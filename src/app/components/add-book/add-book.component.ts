import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})

export class AddBookComponent implements OnInit {

  bookForm: FormGroup;
  imagePreview: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    // this.bookForm = this.formBuilder.group({
    //   name: [''],
    //   price: [''],
    //   description: ['']
    // })
  }

  ngOnInit() {
    this.bookForm = new FormGroup({
      image: new FormControl(null, { validators: [Validators.required] }),
      name: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required] }),
      details1: new FormControl(null, { validators: [Validators.required] }),
      details2: new FormControl(null, { validators: [Validators.required] }),
      details3: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] })
    })
  }


  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.bookForm.patchValue({ image: file });
    this.bookForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file)

    console.log(file);
    console.log(this.bookForm);

  }

  onSubmit(): any {
    this.crudService.AddBook(this.bookForm.value.name, this.bookForm.value.price, this.bookForm.value.description, this.bookForm.value.details1, this.bookForm.value.details2, this.bookForm.value.details3, this.bookForm.value.image)
      .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/books-list'))
      }, (err) => {
        console.log(err);
      });
  }

}