import React from 'react';
import styles from '../Articles.css.js';
import { useMediaQuery } from 'react-responsive';

const TableHeader = ({text}) => (
    <th style={styles.tableHeader}>{text}</th>
);
const CostsTable = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const mainStyle = Object.assign(
        styles.exampleTable,
        isMobile && styles.exampleTableMobile
    );

    const TableRow = ({dataArray, color}) => {
        return(
            dataArray.map((idx, data) => (
                <td key={`${idx}-row`} style={color === '1' ? styles.tableData : styles.tableData2}>{data}</td>
            ))
        )
    };

    const row1 = [
        '$1,000',
        '24.00%',
        '12 months',
        '3.00%',
        '$30.00',
        '$94.56',
        '29.82%',
        '$1,134.72',
        '$164.72'
    ];
    const row2 = [
        '$2,000',
        '19.00%',
        '24 months',
        '5.00%',
        '$100.00',
        '$100.82',
        '24.12%',
        '$2,419.68',
        '$519.68'
    ];
    const row3 = [
        '$5,000',
        '13.00%',
        '48 months',
        '8.00%',
        '$400.00',
        '$131.67',
        '18.23%',
        '$6,320.12',
        '$1,720.12'
    ];
    const row4 = [
        '$10,000',
        '7.90%',
        '60 months',
        '10.00%',
        '$1,000.00',
        '$202.28',
        '9.20%',
        '$12,136.80',
        '$3,136.80'
    ];

    return (
        <table style={mainStyle}>
            <tbody style={{width: '100%'}}>
                <tr>
                    <TableHeader text="Loan Amount"/>
                    <TableHeader text="Interest Rate"/>
                    <TableHeader text="Loan Term"/>
                    <TableHeader text="Fee"/>
                    <TableHeader text="Fee Cost"/>
                    <TableHeader text="Repayment"/>
                    <TableHeader text="APR"/>
                    <TableHeader text="Total Repayments"/>
                    <TableHeader text="Total Cost"/>
                </tr>
                <tr>
                    <TableRow dataArray={row1} color='1'/>
                </tr>
                <tr>
                    <TableRow dataArray={row2} color='2'/>
                </tr>
                <tr>
                    <TableRow dataArray={row3} color='1'/>
                </tr>
                <tr>
                    <TableRow dataArray={row4} color='2'/>
                </tr>
            </tbody>
        </table>
    );
};

export default CostsTable;