import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/PointEdit.vue';

describe('PointEdit.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      props: { msg: pName },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
