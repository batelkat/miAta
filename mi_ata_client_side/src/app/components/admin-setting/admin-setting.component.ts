import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminSettingService } from 'src/app/provider/services/admin-setting.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Nation } from 'src/app/provider/models/nation.model';
import { SelectService } from 'src/app/provider/services/select.service';
import { Religion } from 'src/app/provider/models/religion.model';
import { find, map } from 'rxjs/operators';
import { Question } from 'src/app/provider/models/question.model';
import { KnowledgeItem } from '../chat/models/knowledge-item.model';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.scss']
})
export class AdminSettingComponent implements OnInit {

  questionCreationForm: FormGroup;
  knowledgeItemCreationForm: FormGroup;
  nationCreationForm: FormGroup;
  religionCreationForm: FormGroup;

  nationList$: Nation[] = [];
  // nationList$: Observable<Nation[]>;
  religionList: Religion[];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminSettingService,
    private _snackBar: MatSnackBar,
    private selectService: SelectService
  ) { }

  ngOnInit(): void {
    this.initForms();
    this.getNationList();
  }

  initForms() {
    this.questionCreationForm = this.fb.group({
      questionBody: [''],
      nation: [null],
      religionId: [null]
    });

    this.knowledgeItemCreationForm = this.fb.group({
      title: [''],
      description: [''],
      nation: [null],
      religionId: [null]
    });

    this.nationCreationForm = this.fb.group({
      name: ['']
    });

    this.religionCreationForm = this.fb.group({
      nation: [null],
      name: ['']
    });


    this.questionCreationForm.controls.nation.valueChanges.subscribe((value: Nation) => {
      this.religionList = value.religion;
    });

    this.knowledgeItemCreationForm.controls.nation.valueChanges.subscribe((value: Nation) => {
      this.religionList = value.religion;
    });

    this.religionCreationForm.controls.nation.valueChanges.subscribe((value: Nation) => {
      this.religionList = value.religion;
    });

  }


  createQuestion() {
    const question = this.questionCreationForm.controls.questionBody.value;
    const religionId = this.questionCreationForm.controls.religionId.value;

    this.adminService.AddQuestion(religionId, question).subscribe(response => {
      if (response.successStatus) {
        this.openSnackBar(response.message, '');
        this.questionCreationForm.reset();
        this.getNationList();

      } else {
        this.openSnackBar(response.message, '');
      }
    });
  }


  createKnowledgeItem() {
    const title = this.knowledgeItemCreationForm.controls.title.value;
    const description = this.knowledgeItemCreationForm.controls.description.value;
    const religionId = this.knowledgeItemCreationForm.controls.religionId.value;

    this.adminService.AddKnowledgeItem(religionId, title, description).subscribe(response => {
      if (response.successStatus) {
        this.openSnackBar(response.message, '');
        this.knowledgeItemCreationForm.reset();
        this.getNationList();
      } else {
        this.openSnackBar(response.message, '');
      }
    });
  }

  createNation() {
    const name = this.nationCreationForm.controls.name.value;

    this.adminService.AddNation(name).subscribe(response => {
      if (response.successStatus) {
        this.openSnackBar(response.message, '');
        this.nationCreationForm.reset();
        this.getNationList();
      } else {
        this.openSnackBar(response.message, '');
      }
    });
  }

  createReligion() {
    const name = this.religionCreationForm.controls.name.value;
    const selectedNationId = this.religionCreationForm.controls.nation.value._id;
    this.adminService.AddReligion(selectedNationId, name).subscribe(response => {
      if (response.successStatus) {
        this.openSnackBar(response.message, '');
        this.religionCreationForm.reset();
        this.getNationList();

      } else {
        this.openSnackBar(response.message, '');
      }
    });
  }

  removeReligion(nationId: string, religionId: string) {
    this.adminService.removeReligion(nationId, religionId).subscribe(response => {
      if (response.successStatus) {
        this.openSnackBar(response.message, '');
        this.religionCreationForm.reset();
        this.getNationList();

      } else {
        this.openSnackBar(response.message, '');
      }
    });
  }

  removeNation(nationId: string) {
    this.adminService.removeNation(nationId).subscribe(response => {
      if (response.successStatus) {
        this.openSnackBar(response.message, '');
        this.religionCreationForm.reset();
        this.getNationList();

      } else {
        this.openSnackBar(response.message, '');
      }
    });
  }

  removeQuestion(questionId: string) {
    this.adminService.removeQuestion(questionId).subscribe(response => {
      if (response.successStatus) {
        this.openSnackBar(response.message, '');
        this.religionCreationForm.reset();
        this.getNationList();

      } else {
        this.openSnackBar(response.message, '');
      }
    });
  }

  removeGoodToKnowItem(itemId: string) {
    this.adminService.removeGoodToKnowItem(itemId).subscribe(response => {
      if (response.successStatus) {
        this.openSnackBar(response.message, '');
        this.religionCreationForm.reset();
        this.getNationList();
      } else {
        this.openSnackBar(response.message, '');
      }
    });
  }

  getNationList() {
    this.selectService.getAllNation().subscribe((res)=> {
      this.nationList$ = res.nations
      this.selectService.nationListStored = this.nationList$;
      console.log("file: admin-setting.component.ts ~ line 194 ~ getNationList ~ this.nationList$", this.nationList$)
    });
  }



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
