import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { Route } from 'vue-router';
import store from '@/store';

export interface ITagsViewState {
  visitedViews: Route[];
  cachedViews: string[];
}

@Module({dynamic: true, store, name: 'tagsView'})
class TagsView extends VuexModule implements ITagsViewState {
  public visitedViews: Route[] = [];
  public cachedViews: string[] = [];

  @Action
  public AddView(view: Route) {
    store.dispatch('AddVisitedView', view);
    store.dispatch('AddCachedView', view);
  }

  @Action({commit: 'ADD_VISITED_VIEW'})
  public AddVisitedView(view: Route) {
    return view;
  }

  @Action({commit: 'ADD_CACHED_VIEW'})
  public AddCachedView(view: Route) {
    return view;
  }

  @Action
  public async DelView(view: Route) {
    store.dispatch('DelVisitedView', view);
    store.dispatch('DelCachedView', view);
    return {
      visitedViews: [...this.visitedViews],
      cachedViews: [...this.cachedViews]
    };
  }

  @Action
  public async DelVisitedView(view: Route) {
    store.commit('DEL_VISITED_VIEW', view);
    return [...this.visitedViews];
  }

  @Action
  public async DelCachedView(view: Route) {
    store.commit('DEL_CACHED_VIEW', view);
    return [...this.cachedViews];
  }

  @Action
  public async DelOthersViews(view: Route) {
    store.dispatch('DelOthersVisitedViews', view);
    store.dispatch('DelOthersCachedViews', view);
    return {
      visitedViews: [...this.visitedViews],
      cachedViews: [...this.cachedViews]
    };
  }

  @Action
  public async DelOthersVisitedViews(view: Route) {
    store.commit('DEL_OTHERS_VISITED_VIEWS', view);
    return [...this.visitedViews];
  }

  @Action
  public async DelOthersCachedViews(view: Route) {
    store.commit('DEL_OTHERS_CACHED_VIEWS', view);
    return [...this.cachedViews];
  }

  @Action
  public async DelAllViews(view?: Route) {
    store.dispatch('DelAllVisitedViews', view);
    store.dispatch('DelAllCachedViews', view);
    return {
      visitedViews: [...this.visitedViews],
      cachedViews: [...this.cachedViews]
    };
  }

  @Action
  public async DelAllVisitedViews(view: Route) {
    store.commit('DEL_ALL_VISITED_VIEWS', view);
    return [...this.visitedViews];
  }

  @Action
  public async DelAllCachedViews(view: Route) {
    store.commit('DEL_ALL_CACHED_VIEWS', view);
    return [...this.cachedViews];
  }

  @Action({commit: 'UPDATE_VISITED_VIEW'})
  public UpdateVisitedView(view: Route) {
    return view;
  }

  @Mutation
  public ADD_VISITED_VIEW(view: Route) {
    if (this.visitedViews.some((v) => v.path === view.path)) return;
    this.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    );
  }

  @Mutation
  public ADD_CACHED_VIEW(view) {
    if (this.cachedViews.includes(view.name)) return;
    if (!view.meta.noCache) {
      this.cachedViews.push(view.name);
    }
  }

  @Mutation
  public DEL_VISITED_VIEW(view: Route) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1);
        break;
      }
    }
  }

  @Mutation
  public DEL_CACHED_VIEW(view: Route) {
    for (const i of this.cachedViews) {
      if (i === view.name) {
        const index = this.cachedViews.indexOf(i);
        this.cachedViews.splice(index, 1);
        break;
      }
    }
  }

  @Mutation
  public DEL_OTHERS_VISITED_VIEWS(view: Route) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews = this.visitedViews.slice(i, i + 1);
        break;
      }
    }
  }

  @Mutation
  public DEL_OTHERS_CACHED_VIEWS(view: Route) {
    for (const i of this.cachedViews) {
      if (i === view.name) {
        const index = this.cachedViews.indexOf(i);
        this.cachedViews = this.cachedViews.slice(index, index + 1);
        break;
      }
    }
  }

  @Mutation
  public DEL_ALL_VISITED_VIEWS() {
    this.visitedViews = [];
  }

  @Mutation
  public DEL_ALL_CACHED_VIEWS() {
    this.cachedViews = [];
  }

  @Mutation
  public UPDATE_VISITED_VIEW(view: Route) {
    for (let v of this.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  }
}

export const TagsViewModule = getModule(TagsView);



