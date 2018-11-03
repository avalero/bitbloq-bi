import Users from '../collections/Users';
import Projects from '../collections/Projects';
import Report from './Report';

export interface ProjectUser{
  userid:string,
  projects: Array<Object>,
}

export type ProjectsByUserReport = Array<ProjectUser>;

export default class ProjectsReport extends Report{
  private projectsCollection: Projects;
  private users:Users;

  constructor(pc: Projects, users:Users) {
    super(pc);
    if (pc) this.projectsCollection = pc;
    else throw new Error('Collection not defined');

    if(users) this.users = users;
    else throw new Error('Users Collection not defined');
  }

  public async getProjectsByUsers(userid:string):Promise<ProjectsByUserReport>{
    const result:ProjectsByUserReport = [];
    let projectsUser: ProjectUser;
    const usersArray:Array<Object> = await this.users.get();
    for (let user of usersArray){
      const userid = (user as any)["_id"];
      const projects = await this.projectsCollection.getProjectsByUser(userid);
      projectsUser = {userid, projects};
      result.push(projectsUser);
    }
    return result;
  }
}
