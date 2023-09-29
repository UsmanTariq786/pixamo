
import React, { useState } from 'react'
import { Button, Dialog } from 'components/ui'
import UploadModal from './UploadModal'
import { HiPlusCircle } from 'react-icons/hi'

const StaticBackdrop = () => {
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
    }

    return (
        <div>
            <Button variant="solid" size="sm" icon={<HiPlusCircle />} onClick={() => openDialog()} style={{ backgroundColor: "#5271FF", color: "white" }}>
                Import
            </Button>

            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                bodyOpenClassName="overflow-hidden"
            >
                <h5 className="mb-4">Upload your files</h5>
                <UploadModal />
                <div className="text-right mt-6">
                    <Button
                        size="sm"
                        style={{ color: 'white', backgroundColor: '#5271FF' }}
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        style={{ color: 'white', backgroundColor: '#5271FF' }}
                        variant="solid"
                        onClick={onDialogOk}
                    >
                        Okay
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default StaticBackdrop
