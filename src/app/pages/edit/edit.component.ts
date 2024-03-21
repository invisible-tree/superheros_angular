import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HerosService } from '../../services/heros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public isEdit = false;
  private id!: number;
  private subs: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public herosService: HerosService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subs.push(
      this.route.queryParams.subscribe((params) => {
        if (params) {
          this.setForm(params['id']);
          this.isEdit = true;
          this.id = Number(params['id']);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      picture_url: ['', Validators.required],
      force_level: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      defense_level: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      main_skill: ['', Validators.required],
    });
  }

  private setForm(id: any): void {
    const selectedHero = this.herosService.getHeroById(Number(id));
    this.form.patchValue(selectedHero);
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const newHero = { ...this.form.value };
      this.herosService.setNewHero(newHero, this.id);
      this.loaderService.setLoaderMock(2000);
      this.router.navigate(['']);
      this.notificationService.setNotification(
        'Superhéroe creado correctamente'
      );
    } else {
      this.notificationService.setNotification('Se ha producido un error');
    }
  }
}
