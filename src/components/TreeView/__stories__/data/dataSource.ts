import { DataSource } from '../../types'
import { generateData } from './generator'

const totalSize = 23

export const lazyLoadDataSource: DataSource = {
  getPageSize: () => 5,
  getData: ({ size, page, item }) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          last: totalSize <= (page + 1) * size,
          content: generateData(
            item.label,
            item.value,
            size * (page + 1) > totalSize ? totalSize % size : size,
            page * size,
            true
          ),
          page,
          pageSize: size,
          totalSize,
        })
      }, 1000)
    }),
}

export const staticDataSource: DataSource = {
  getPageSize: () => 10,
  getData: ({ size, page, item }) => {
    return Promise.resolve({
      page,
      pageSize: size,
      content: [],
      totalSize: 100,
      last: false,
    })
  },
}
