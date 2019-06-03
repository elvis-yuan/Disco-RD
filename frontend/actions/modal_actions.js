export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const EDIT_CHANNEL = "EDIT_CHANNEL";

export const openModal = modal => {
  return {
    type: OPEN_MODAL,
    modal
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const editChannel = id => {
  return {
    type: EDIT_CHANNEL,
    id
  };
};
