import React, { useEffect, useMemo, useRef } from 'react'
// import { Avatar } from 'components/ui'
import { DataTable } from 'components/shared'
import {  HiOutlineTrash } from 'react-icons/hi'
// import { FiPackage } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import {
    // getProducts,
    setTableData,
    updateProductList,
} from '../store/dataSlice'
import { setSelectedProduct } from '../store/stateSlice'
import { toggleDeleteConfirmation } from '../store/stateSlice'
// import useThemeClass from 'utils/hooks/useThemeClass'
import ProductDeleteConfirmation from './ProductDeleteConfirmation'
// import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
// import { data1 } from './data'
// import StaticBackdrop from './dialog'
import EditOption from './editOption'
import axios from 'axios'

// const inventoryStatusColor = {
//     0: {
//         label: 'In Stock',
//         dotClass: 'bg-emerald-500',
//         textClass: 'text-emerald-500',
//     },
//     1: {
//         label: 'Limited',
//         dotClass: 'bg-amber-500',
//         textClass: 'text-amber-500',
//     },
//     2: {
//         label: 'Out of Stock',
//         dotClass: 'bg-red-500',
//         textClass: 'text-red-500',
//     },
// }

const ActionColumn = ({ row, header }) => {
    // const { token } = useSelector((state) => state.auth.session)
    const dispatch = useDispatch()
    // const { textTheme } = useThemeClass()
    // const navigate = useNavigate()

    // const onEdit = (row) => {
    //     return <StaticBackdrop />
    // }
    // const header = { Authorization: `Bearer ${token}` }

    const onDelete = (row) => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.id))
    }

    return (
        <div className="flex justify-end text-lg">
            <EditOption row={row} header={header} />
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={()=>onDelete(row)}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

// const ProductColumn = ({ row }) => {
//     const avatar = row.img ? (
//         <Avatar src={row.img} />
//     ) : (
//         <Avatar icon={<FiPackage />} />
//     )

//     return (
//         <div className="flex items-center">
//             {avatar}
//             <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
//         </div>
//     )
// }

const ProductTable = () => {
    const { token } = useSelector((state) => state.auth.session)
    const tableRef = useRef(null)
    const data = useSelector((state) => state.salesProductList.data.productList)
    console.log(data)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.salesProductList.data.tableData
    )

    const filterData = useSelector(
        (state) => state.salesProductList.data.filterData
    )

    const loading = useSelector((state) => state.salesProductList.data.loading)
    const header = { Authorization: `Bearer ${token}` }

    const getData = async () => {
        const response = await axios.get(`${process.env.REACT_APP_URL}folder`, {
            headers: header,
        })
        dispatch(updateProductList(response.data.data))
    }
    useEffect(() => {
        getData()
    }, [])

    // useEffect(() => {
    //     fetchData()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    // const fetchData = () => {
    //     dispatch(getProducts({ pageIndex, pageSize, sort, query, filterData }))
    // }

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
            },
            {
                header: 'Invoices',
                accessorKey: 'count',
                sortable: true,
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn row={props.row.original} header={header} />
                ),
            },
            // {
            //     header: 'Status',
            //     accessorKey: 'status',
            //     cell: (props) => {
            //         const { status } = props.row.original
            //         return (
            //             <div className="flex items-center gap-2">
            //                 <Badge
            //                     className={
            //                         inventoryStatusColor[status].dotClass
            //                     }
            //                 />
            //                 <span
            //                     className={`capitalize font-semibold ${inventoryStatusColor[status].textClass}`}
            //                 >
            //                     {inventoryStatusColor[status].label}
            //                 </span>
            //             </div>
            //         )
            //     },
            // },
        ],
        []
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort, sortingColumn) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <ProductDeleteConfirmation header={header}/>
        </>
    )
}

export default ProductTable
