import { Observable } from 'rxjs';
import { StudyCourse } from './study-course.resource';
import { CustomResource } from './custom-resource';

export class Module extends CustomResource {
  name: string;
  description: string;
}
