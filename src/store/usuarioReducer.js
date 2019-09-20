const INITIAL_STATE = {
  usuarioEmail: '',
  usuarioLogado: false
};

export default function usuarioReduce(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        usuarioLogado: true,
        usuarioEmail: action.usuarioEmail
      };

    case 'LOG_OUT':
      return {
        ...state,
        usuarioLogado: false,
        usuarioEmail: null
      };

    default:
      return state;
  }
}
