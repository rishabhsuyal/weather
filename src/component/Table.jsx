import React from 'react'

function Table() {
    const data =[ 
        ["Punjab","03"],
        ["Chandigarh","04"],
        ["Uttarakhand","05"],
        ["Haryana","06"],
        ["Delhi","07"],
        ["Uttar Pradesh","09"]
     ]
  return (
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    State
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Code
                  </th>
                </tr>
              </thead>
              <tbody>
              
                {
                    data.map(place=><tr class="border-b border-gray-200 dark:border-gray-700">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    {place[0]}
                  </th>
                  <td class="px-6 py-4">
                    {place[1]}
                  </td>

                </tr>)
                }
               
              </tbody>
            </table>
  )
}

export default Table