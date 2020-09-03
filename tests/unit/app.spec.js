/* eslint-env jest */
import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import ServiceBusQueueClient from '@/components/ServiceBusQueueClient.vue'
import TheServiceBusClient from '@/components/TheServiceBusClient.vue'

describe('App.vue', () => {
  let appWrapper
  let infoMsg
  let sbClientMock

  beforeEach(() => {
    sbClientMock = {}
    appWrapper = shallowMount(App, {
      mocks: {
        $log: { info: (msg) => { infoMsg = msg } }
      }
    })
  })

  it('contains TheServiceBusClient and ServiceBusQueueClient', () => {
    const theServiceBusClient = appWrapper.findComponent(TheServiceBusClient)
    expect(theServiceBusClient.exists()).toBe(true)
    const serviceBusQueueClient = appWrapper.findComponent(ServiceBusQueueClient)
    expect(serviceBusQueueClient.exists()).toBe(true)
  })

  it('updates sbClient when it is created', () => {
    const theServiceBusClient = appWrapper.findComponent(TheServiceBusClient)
    theServiceBusClient.vm.$emit('create:serviceBusClient', sbClientMock)

    expect(appWrapper.vm.$data.sbClient).toEqual(sbClientMock)
  })

  it('sets sbClient to null when it is destroyed', () => {
    appWrapper.vm.$data.sbClient = sbClientMock
    const theServiceBusClient = appWrapper.findComponent(TheServiceBusClient)
    theServiceBusClient.vm.$emit('destroy:serviceBusClient')

    expect(appWrapper.vm.$data.sbClient).toEqual(null)
    expect(infoMsg).toEqual('Destroying ServiceBusClient')
  })
})
