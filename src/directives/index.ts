import { DirectiveBinding } from 'vue';

export const focusDirective = {
  mounted: (el: HTMLElement) => {
    el.focus();
  },
};

export const customOnDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    console.log('binding', binding);
    const type = binding.arg;
    const fn = binding.value;
    //@ts-ignore
    el.addEventListener(type, fn);
  },
};

interface ClickOutsideBinding extends DirectiveBinding {
  value: () => void;
}

export const clickOutsideDirective = {
  mounted(el: HTMLElement, { value: cb }: ClickOutsideBinding) {
    //@ts-ignore
    el.clickOutside = ({ clientX, clientY }: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      if (
        !(
          clientX > left &&
          clientX < left + width &&
          clientY > top &&
          clientY < top + height
        )
      ) {
        cb();
        // console.log('outside')
      }
      //  else {
      //   console.log('inside')
      // }
    };
    setTimeout(() => {
        //@ts-ignore
      document.addEventListener('click', el.clickOutside);
    }, 0);
  },
  unmounted(el: HTMLElement) {
    //@ts-ignore
    document.removeEventListener('click', el.clickOutside);
  },
};

export const close = {
  mounted(el: HTMLElement, { value }: DirectiveBinding) {
    // console.log(x)
    el.onkeyup = () => {
      const color = getRandomColor();
      el.style.backgroundColor = color;
      el.style.color = isDarkColor(color) ? 'white' : 'black';
    };
  },
};

function isDarkColor(c: string): boolean {
  c = c.substring(1); // strip #
  const rgb = parseInt(c, 16); // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff; // extract red
  const g = (rgb >> 8) & 0xff; // extract green
  const b = (rgb >> 0) & 0xff; // extract blue
  let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  return luma < 100;
}

function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}