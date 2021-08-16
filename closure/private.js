const useState = function () {
  var state;
  function setState(val) {
    state = val;
  }
  function getState() {
    return state;
  }
  return { setState, getState };
};

const state = useState();

console.log(state.getState());
state.setState(1);
console.log(state.getState());
