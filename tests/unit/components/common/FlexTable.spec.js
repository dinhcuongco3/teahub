import { mount } from 'vitest/vue'
import { defineComponent } from 'vue'
import FlexTable from 'path/to/FlexTable.vue'

const createWrapper = (categoryContent, contentContent) => {
  return mount(defineComponent({
    components: { FlexTable },
    data() {
      return {
        categoryContent,
        contentContent
      }
    },
    template: `
      <FlexTable>
        <template #category>
          {{ categoryContent }}
        </template>
        <template #content>
          {{ contentContent }}
        </template>
      </FlexTable>
    `,
  }))
}

describe('FlexTable', () => {
  it('renders the correct category and content', () => {
    const categoryContent = 'Test Category'
    const contentContent = 'Test Content'
    const wrapper = createWrapper(categoryContent, contentContent)

    expect(wrapper.find('.category-section').text()).toContain(categoryContent)
    expect(wrapper.find('.content-section').text()).toContain(contentContent)
  })

  it('renders empty category and content if not provided', () => {
    const wrapper = createWrapper('', '')

    expect(wrapper.find('.category-section').text()).toBe('')
    expect(wrapper.find('.content-section').text()).toBe('')
  })
})

