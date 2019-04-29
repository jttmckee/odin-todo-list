"use strict"
import {Item} from './item.js'
import {Project} from './project.js'
import {display} from './display.js'

const test = Item("Add items to your todo list", new Date("2020-02-01"));

const test2 = Item("Add another project", new Date("2020-03-01"));

const test3 = Item("test", new Date("2020-04-01"));

const defaultProject = Project("Default Project");

defaultProject.addItems([test,test2]);

const projectList = [defaultProject, Project("Another Project")];

display(projectList, 'project-list');
