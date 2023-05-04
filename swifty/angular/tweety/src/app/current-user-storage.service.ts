import { Injectable } from '@angular/core';
import { MessageService } from './services/message.service';
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';
import { RoleService } from './services/role.service';
import { StatusService } from './services/status.service';
import { UserService } from './services/user.service';
import { User } from './actors/user';
import { Project } from './actors/project';
import { BehaviorSubject, Observable, combineLatest, filter, forkJoin, map, switchMap} from 'rxjs';
import { Role } from './actors/role';
import { Task } from './actors/task';
import { Status } from './actors/status';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserStorageService {
  private currentUser: User = {} as User;
  private roles: Role[] = [];
  //currrents
  private currentProject: Project = {} as Project;
  private currentTask: Task = {} as Task;
  // #tesing
  private currentProject$: BehaviorSubject<Project | undefined> = new BehaviorSubject<Project | undefined>(undefined);
  private currentTask$: BehaviorSubject<Task | undefined> = new BehaviorSubject<Task | undefined>(undefined);
  private currentStatus$: BehaviorSubject<Status | undefined> = new BehaviorSubject<Status | undefined>(undefined);
  private projectStatus: Status[] = [];
  private select: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private currentUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  private currentRole$: BehaviorSubject<Role | undefined> = new BehaviorSubject<Role | undefined>(undefined);



  constructor(
    private userservice: UserService,
    private projectservice: ProjectService,
    private roleservice: RoleService
  ) {}

  setUser(loginUser: User): void {
    this.currentUser = loginUser;
    // this.currentUser.Roles.map(x => this.roleservice.getRoleById(x).subscribe(y => this.roles.push(y)))
    this.roleservice.getRoles().subscribe((x) => {
      let uniqueData = x
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        })
        .filter((g) => this.currentUser.Roles.includes(g.RoleID));
      this.roles = uniqueData;
    });
  }
  getUser(): User {
    return this.currentUser;
  }
  getrole(): Role[] {
    return this.roles;
  }
  
  getCurrentUserProjects(): Observable<Project[]> {
    // return this.projectservice.getProjects().pipe(
    //   map((projects) => {
    //     return projects.filter((item) => {
    //       for (let index = 0; index < this.roles.length; index++) {
    //         if (this.roles[index].ProjectID === item.ProjectID) {
    //           return true;
    //         }}
    //         return false;});}));

    return this.projectservice.getProjects().pipe(
      map((projects) => projects.filter((item) => this.roles.some(role => role.ProjectID === item.ProjectID)))
    );
  }

  public getCurrentProject(): Project {
    return this.currentProject;
  }

  public setCurrentProject(project: Project): void {
    this.currentProject = project;
  }

  public getCurrentTask(): Task {
    return this.currentTask;
  }

  public setCurrentTask(task: Task): void {
    this.currentTask = task;
  }
  
  public getProjectStatusID(): Status[] {
    return this.projectStatus;
  }

  public setProjectStatusID(statusID: Status[]): void {
    this.projectStatus = statusID;
  }
  //you must subscription and to be safe after getting value resub to it 
  setCurrentProject$(value: Project | undefined) {
    this.currentProject$.next(value);
  }
  public getCurrentProject$(): Observable<Project | undefined> {
    return this.currentProject$.asObservable();
  }
  setCurrentTask$(value: Task | undefined) {
    this.currentTask$.next(value);
  }
  public getCurrentTask$(): Observable<Task | undefined> {
    return this.currentTask$.asObservable();
  }

  setCurrentStatus$(value: Status | undefined) {
    this.currentStatus$.next(value);
  }

  public getCurrentStatus$(): Observable<Status | undefined> {
    return this.currentStatus$.asObservable();
  }

  setCurrentUser$(value: User | undefined) {
    this.currentUser$.next(value);
  }

  public getCurrentUser$(): Observable<User | undefined> {
    return this.currentUser$.asObservable();
  }

  setCurrentRole$(value: Role | undefined) {
    this.currentRole$.next(value);
  }

  public getCurrentRole$(): Observable<Role | undefined> {
    return this.currentRole$.asObservable();
  }

  setSelect$(value: number) {
    this.select.next(value);
  }

  public getSelect$(): Observable<number> {
    return this.select.asObservable();
  }

}
