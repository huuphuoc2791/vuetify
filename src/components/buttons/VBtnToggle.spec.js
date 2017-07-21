import { mount } from 'avoriaz'
import VBtnToggle from 'src/components/buttons/VBtnToggle'
import VBtn from 'src/components/buttons/VBtn'
import VIcon from 'src/components/icons/VIcon'
import ripple from 'src/directives/ripple'
import { test } from '~util/testing'
import Vue from 'vue'

function createBtn (val = null) {
  const options = {
    props: { flat: true }
  }
  if (val) options.attrs = { value: val }

  return Vue.component('test', {
    components: {
      VBtn,
      VIcon
    },
    render (h) {
      return h('v-btn', options, [h('v-icon', 'add')])
    }
  })
}

test('VBtnToggle.vue', () => {
  it('should not allow empty value when mandatory prop is used', () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 0,
        mandatory: true
      },
      slots: {
        default: [
          createBtn(),
          createBtn(),
          createBtn()
        ]
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.instance().updateValue(0)

    expect(change).not.toBeCalled()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should allow new value when mandatory prop is used', () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 1,
        mandatory: true
      },
      slots: {
        default: [
          createBtn(),
          createBtn(),
          createBtn()
        ]
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.instance().updateValue(0)

    expect(change).toBeCalledWith(0)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not allow empty value when mandatory prop is used with multiple prop', () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: [1],
        mandatory: true,
        multiple: true
      },
      slots: {
        default: [
          createBtn(),
          createBtn(),
          createBtn()
        ]
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.instance().updateValue(1)

    expect(change).toBeCalledWith([1])
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should allow new value when mandatory prop is used with multiple prop', () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: [1],
        mandatory: true,
        multiple: true
      },
      slots: {
        default: [
          createBtn(),
          createBtn(),
          createBtn()
        ]
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.instance().updateValue(2)

    expect(change).toBeCalledWith([1, 2])
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use button value attribute if available', () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 'center'
      },
      slots: {
        default: [
          createBtn('left'),
          createBtn('center'),
          createBtn('right')
        ]
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.instance().updateValue(2)

    expect(change).toBeCalledWith('right')
    expect(wrapper.html()).toMatchSnapshot()
  })
})