<template>
    <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h3><slot name="header">Header</slot></h3>
          </div>

          <div class="modal-body">
            <slot name="body">Body</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name: 'modal'
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  
  background-color: #202225;
  color: #fff;

  border-radius: .25rem;
  transition: all .3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #ffcd00;
}

.modal-body {
  margin: 20px 0;
}
.modal-footer {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
}
.modal-default-button {
    background: #2f3136;
    color: #fff;

    border-radius: .25rem;
    padding: .25rem .5rem;

    border: none;
    outline: none;

    cursor: pointer;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
