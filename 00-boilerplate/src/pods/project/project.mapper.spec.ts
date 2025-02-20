import { mapProjectFromApiToVm } from "./project.mapper";
import * as viewModel from './project.vm';
import * as apiModel from './api/project.api-model';

describe('./pods/project/project.mapper', () => {
  it('should return empty project when receiving null value', () =>{
    // Arrange
    const project = null;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return empty project when receiving undefined value', () =>{
    // Arrange
    const project = undefined;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return not empty project although receiving null employee list', () =>{
    // Arrange
    const project: apiModel.Project = {
      id: '1',
      name: 'test name',
      externalId: '1234',
      comments: 'test comment',
      isActive: true,
      employees: null,
    };

    const expectedProject: viewModel.Project = {
      id: '1',
      name: 'test name',
      externalId: '1234',
      comments: 'test comment',
      isActive: true,
      employees: [],
    }

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedProject);
  });

  it('should return not empty project although receiving undefined employee list', () =>{
    // Arrange
    const project: apiModel.Project = {
      id: '1',
      name: 'test name',
      externalId: '1234',
      comments: 'test comment',
      isActive: true,
      employees: undefined,
    };

    const expectedProject: viewModel.Project = {
      id: '1',
      name: 'test name',
      externalId: '1234',
      comments: 'test comment',
      isActive: true,
      employees: [],
    }

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedProject);
  });

  it('should return expected project when receiving all values correct', () =>{
    // Arrange
    const project: apiModel.Project = {
      id: '1',
      name: 'test name',
      externalId: '1234',
      comments: 'test comment',
      isActive: true,
      employees: [
        {
          id: '1',
          isAssigned: false,
          employeeName: 'test name 1',
        },
        {
          id: '2',
          isAssigned: true,
          employeeName: 'test name 2',
        },
      ],
    };

    const expectedProject: viewModel.Project = {
      id: '1',
      name: 'test name',
      externalId: '1234',
      comments: 'test comment',
      isActive: true,
      employees: [
        {
          id: '1',
          isAssigned: false,
          employeeName: 'test name 1',
        },
        {
          id: '2',
          isAssigned: true,
          employeeName: 'test name 2',
        },
      ],
    }

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedProject);
  });
});
