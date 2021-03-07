import { shallowMount } from '@vue/test-utils';
import PostSingle from "../../../src/views/PostSingle";

describe('login page', ()=>{
    test('load login page with no error', ()=>{
        const wrapper = shallowMount(PostSingle, {
            stubs: ['router-link']
        })
        expect(wrapper.find('.error').exists()).toBe(false);
    });
     test('login called', async ()=>{
         const wrapper = shallowMount(PostSingle, {
             stubs: ['router-link'],
         })

         const _login = await jest.spyOn(wrapper.vm, 'login')
         const btn = wrapper.find('form')
         btn.trigger('submit')

         expect(_login).toHaveBeenCalled()
    })

});