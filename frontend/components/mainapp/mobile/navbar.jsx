import React from 'react';

const Mobilebar = props => {
  const showBar = () => {
    let drawer = document.getElementsByClassName('drawer')[0];
    drawer.style.display = 'flex';
    let modal = document.getElementById('drawer-modal');
    modal.addEventListener("click", () => {
      drawer.style.display = 'none';
    })
  }

  return (
    <div className='mobile-bar'>
      <span onClick={showBar}> <i class="fas fa-bars"></i> </span>
    </div>
  )
}

export default Mobilebar;