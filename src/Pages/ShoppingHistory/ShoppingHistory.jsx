import React from 'react'

import { Card } from '../../Components/Card/Card'

export const ShoppingHistory = () => {
    return (
        <div style={{ padding: 20 }}>
            <h1>Historial de compras</h1>
            <div style={{ padding: 20 }}>
                <Card typeCard='history' name={'Pickachup'} />
            </div>
        </div>
    )
}
