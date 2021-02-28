import { shallowMount } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import sinon from 'sinon'
import axios  from "axios";

describe('login page', ()=>{
    test('load login page with no error', ()=>{
        const wrapper = shallowMount(Login, {
            stubs: ['router-link']
        })
        expect(wrapper.find('.error').exists()).toBe(false);
    });
     test('login to account', async ()=>{

         const wrapper = shallowMount(Login, {
             stubs: ['router-link']
         })

         wrapper.find('button').trigger('click')

         expect(wrapper.text()).toContain('error')
    })

});