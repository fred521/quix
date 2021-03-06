import {IScope as ngIscope} from 'angular';
import {IFile} from '../../../../shared';

export interface IScope extends ngIscope {
  breadcrumbs: IFile;
  quixBreadcrumbsOptions: Record<string, any>;
  onFolderClick: Function;
  onNameChange: Function;
  vm: any;
}
