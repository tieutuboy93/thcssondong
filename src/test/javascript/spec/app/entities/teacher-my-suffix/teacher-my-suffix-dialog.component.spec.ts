/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ThcssondongTestModule } from '../../../test.module';
import { TeacherMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/teacher-my-suffix/teacher-my-suffix-dialog.component';
import { TeacherMySuffixService } from '../../../../../../main/webapp/app/entities/teacher-my-suffix/teacher-my-suffix.service';
import { TeacherMySuffix } from '../../../../../../main/webapp/app/entities/teacher-my-suffix/teacher-my-suffix.model';
import { SchoolMySuffixService } from '../../../../../../main/webapp/app/entities/school-my-suffix';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('TeacherMySuffix Management Dialog Component', () => {
        let comp: TeacherMySuffixDialogComponent;
        let fixture: ComponentFixture<TeacherMySuffixDialogComponent>;
        let service: TeacherMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [TeacherMySuffixDialogComponent],
                providers: [
                    SchoolMySuffixService,
                    UserService,
                    TeacherMySuffixService
                ]
            })
            .overrideTemplate(TeacherMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeacherMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeacherMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TeacherMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.teacher = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'teacherListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TeacherMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.teacher = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'teacherListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
