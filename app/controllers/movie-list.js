import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { onKey } from 'ember-keyboard';

export default class MovieListController extends Controller {
  @service movie;
  @service router;

  @tracked sorts = [];
  @tracked title = '';
  @tracked searchTerm = false;

  @tracked selectedFormFields = ['S.No','Name','Year','IMDb','Genre','Box Office (In Millions)'];
  @tracked selectedFields = ['Name', 'Year', 'Genre', 'IMDb', 'Box_Office'];
  @tracked allColumns = [];
  @tracked customizableFields = false;
 
  async model() {
    const columnsResponse = await fetch('/assets/data/table-head.json');
    this.allColumns = await columnsResponse.json();

    const saved = localStorage.getItem('columnWidths');
    if (saved) {
      const savedColumns = JSON.parse(saved);
      this.allColumns = this.allColumns.map((col) => {
        const savedCol = savedColumns.find(c => c.valuePath === col.valuePath);
        return savedCol ? { ...col, width: savedCol.width } : col;
      });
    }
  }

  @action
  handleColumnResize(column, newWidth) {
    console.log(`Column "${column.name}" resized to: ${newWidth}px`);
    this.allColumns = this.allColumns.map((col) =>
      col.valuePath === column.valuePath
        ? { ...col, width: newWidth }
        : col
    );

    // Persist updated widths
    localStorage.setItem('columnWidths', JSON.stringify(this.allColumns));
  }

  

@action
toggleFormFields(event){
  const value = event.target.value;
  if (this.selectedFormFields.includes(value)) {
    this.selectedFormFields = this.selectedFormFields.filter((f) => f !== value);
  } else {
    this.selectedFormFields = [...this.selectedFormFields, value];
  }

  console.log(this.selectedFormFields);
}
  @action
  updateSorts(newSorts) {
    this.sorts = newSorts;
  }

  @action
  handleColumnReorder(newOrder) {
    // Update the model's columns array with the new order
    this.model.columns = [...newOrder];
  }
  @action 
  toggleCustomizableFields(){
    this.customizableFields = !this.customizableFields;
  }
  @action
  closeCustomizableFields(){
    this.customizableFields = false;
  }

  @onKey('ctrl+a')
  @action
  addShortcut(event) {
    event.preventDefault();
    this.router.transitionTo('addm');
  }

  @onKey('ctrl+d')
  @action
  deleteShortcut(event) {
    event.preventDefault();
    this.router.transitionTo('delm');
  }

  @onKey('ctrl+e')
  @action
  editShortcut(event) {
    event.preventDefault();
    this.router.transitionTo('editMovie');
  }

  @onKey('ctrl+f')
  @action
  fetchShortcut(event) {
    event.preventDefault();
    this.router.transitionTo('fetch-movies');
  }

@action
toggleField(event) {
  console.log('before', this.selectedFields);
  const value = event.target.value;
  if (this.selectedFields.includes(value)) {
    this.selectedFields = this.selectedFields.filter((f) => f !== value);
  } else {
    this.selectedFields = [...this.selectedFields, value];
  }
  console.log('after', this.selectedFields);
}

@action
updateTitle(event) {
  this.title = event.target.value;
}

@action
toggleSearchTerm() {
  this.searchTerm = true;
}

@action
closeSearchTerms() {
  this.searchTerm = false;
}
get sortedMovies() {
  let movies = this.model.movies ?? [];

  // If no search term or no selected fields, return full list
  if (!this.title?.trim() || this.selectedFields.length === 0) {
    return movies;
  }

  const search = this.title.trim().toLowerCase();

  return movies.filter((movie) => {
    return this.selectedFields.some((field) => {
      switch (field) {
        case 'Name':
          return movie.name?.toLowerCase().includes(search);
        case 'Year':
          return String(movie.year).includes(this.title);
        case 'Genre':
          return movie.genre?.toLowerCase().includes(search);
        case 'IMDb':
          return String(movie.imdb).includes(this.title);
        case 'Box_Office':
          return String(movie.box_office).includes(this.title);
        default:
          return false;
      }
    });
  });
}

@action
  toggleExpand(row) {
    if (this.expandedRows.includes(row.id)) {
      this.expandedRows = this.expandedRows.filter(id => id !== row.id);
    } else {
      this.expandedRows = [...this.expandedRows, row.id];
    }
  }

  getNestedRowsFor(row) {
    return row.cast || [];
  }
}