/*
 * Copyright (C) 2019 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'
import {mount} from 'enzyme'
import DefaultToolForm, { toolSubmissionType } from '../DefaultToolForm'
import SelectContentDialog from '../../../../public/javascripts/select_content_dialog.js'

const newProps = (overrides = {}) => ({
  ...{
    toolUrl: 'https://www.default-tool.com/blti',
    courseId: 1
  },
  ...overrides
})

describe('DefaultToolForm', () => {
  let wrapper = 'empty wrapper'

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders a button to launch the tool', () => {
    wrapper = mount(<DefaultToolForm {...newProps()} />)
    expect(wrapper.find('#default-tool-launch-button')).toBeTruthy()
  })

  it('launches the tool when the button is clicked', () => {
    SelectContentDialog.Events.onContextExternalToolSelect = jest.fn()
    wrapper = mount(<DefaultToolForm {...newProps()} />)
    wrapper.find('#default-tool-launch-button').first().simulate('click')
    expect(SelectContentDialog.Events.onContextExternalToolSelect).toHaveBeenCalled()
    SelectContentDialog.Events.onContextExternalToolSelect.mockRestore()
  })

  it('renders the information mesage', () => {
    wrapper = mount(<DefaultToolForm {...newProps()} />)
    expect(wrapper.find('Alert').html()).toContain('Click the button above to add a WileyPLUS Question Set')
  })
})

describe('toolSubmissionType', () => {
  it('returns "external_tool" if the submission type is "default_external_tool"', () => {
    expect(toolSubmissionType('default_external_tool')).toEqual('external_tool')
  })

  it('returns the submission type if it is not a tool submission type', () => {
    expect(toolSubmissionType('online')).toEqual('online')
  })
})
