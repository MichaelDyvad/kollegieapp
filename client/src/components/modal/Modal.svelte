<div class="modal-overlay">
    <div class="modal-content">
        <slot></slot>
    </div>
</div>

<style>
    .modal-overlay {
  position: fixed; /* covers the entire screen */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1; /* appear on top of other elements */
}

.modal-content {
  position: fixed; /* position in the center of the screen */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #333;
  padding: 50px;
  z-index: 2; /* appear on top of the overlay */
}
</style>