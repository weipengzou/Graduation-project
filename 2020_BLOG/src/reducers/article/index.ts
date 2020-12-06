import { actionTypes } from '../../actions'

const initState = {
  articleList: [],
  isLoading: true,
}

export default (state: any = initState, action: any) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case actionTypes.GET_ARTICLE:
      console.log('payload', action.payload.articleList)
      newState.articleList = action.payload.articleList
      newState.isLoading = false
      return newState
    case actionTypes.CREATE_ARTICLE: {
      // console.log('CREATE_ARTICLE_PAYLOAD', action.payload)
    }
    default:
      newState = Object.assign({}, state)
      return newState
  }
}
