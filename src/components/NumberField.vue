<script>
import VTextField from 'vuetify/lib/components/VTextField'
export default {
  extends: VTextField,
  props: {
    decimal: {
      type: Number,
      default: 0
    },
    decimalChar: {
      type: String,
      default: '.'
    },
    thousands: {
      type: String,
      default: ','
    }
  },
  computed: {
    internalValue: {
      get() {
        return this.lazyValue
      },
      set(val) {
        val = this.toFixed(this.unFormat('' + val))
        this.lazyValue = val
        this.calcCursor()
        this.$emit('input', this.lazyValue)
      }
    },
    lazyFormatValue () {
      return this.format(this.lazyValue)
    }
  },
  methods: {
    format(val) {
      return val ? this.formatNumber(val, this.decimal, this.decimalChar, this.thousands) : val
    },
    unFormat(val) {
      return val ? this.stringToNumer(val, this.decimalChar) : val
    },
    toFixed(val) {
      return val ? parseFloat(val.toFixed(this.decimal)) : val
    },
    calcCursor() {
      let el = this.$refs.input
      var positionFromEnd = 0
      if (el.value.length === 1 || el.value.length === this.format(this.unFormat(el.value)).length) {
        positionFromEnd= el.value.length - el.selectionEnd
        positionFromEnd = Math.max(positionFromEnd, 0) // right
        positionFromEnd = el.value.length - positionFromEnd
        positionFromEnd = Math.max(positionFromEnd, 1) // left
      } else {
        positionFromEnd = el.value.length - el.selectionEnd
        positionFromEnd = Math.max(positionFromEnd, 0) // right
        positionFromEnd = el.value.length - positionFromEnd
        positionFromEnd = Math.max(positionFromEnd, 1) // left
        positionFromEnd += 1
      }
      this.setCursor(positionFromEnd)
    },
    setCursor (position) {
      let el = this.$refs.input
      var setSelectionRange = function () { el.setSelectionRange(position, position) }
      if (el === document.activeElement) {
        setSelectionRange()
        setTimeout(setSelectionRange, 1) // Android Fix
      }
    },
    genInput() {
      const listeners = Object.assign({}, this.listeners$);
      delete listeners['change']; // Change should not be bound externally

      return this.$createElement('input', {
        style: {},
        domProps: {
          value: this.lazyFormatValue
        },
        attrs: { ...this.attrs$,
          autofocus: this.autofocus,
          disabled: this.disabled,
          id: this.computedId,
          placeholder: this.placeholder,
          readonly: this.readonly,
          type: this.type
        },
        on: Object.assign(listeners, {
          blur: this.onBlur,
          input: this.onInput,
          focus: this.onFocus,
          keydown: this.onKeyDown
        }),
        ref: 'input'
      });
    },
    cursorFocus () {
      if (this.decimal && this.lazyFormatValue) {
        this.setCursor(this.lazyFormatValue.length - this.decimal - 1)
      } else {
        this.setCursor(this.lazyValue ? this.lazyFormatValue.length : 0)
      }

    },
    onFocus(e) {
      if (!this.$refs.input) return;

      if (document.activeElement !== this.$refs.input) {
        this.cursorFocus()
        this.$refs.input.focus();
      }

      if (!this.isFocused) {
        this.isFocused = true;
        e && this.$emit('focus', e);
        this.cursorFocus()
      }
    },
    onClick() {
      if (this.isFocused || this.disabled || !this.$refs.input) return;
      this.$refs.input.focus();
      this.cursorFocus()
    }
  }
}
</script>
