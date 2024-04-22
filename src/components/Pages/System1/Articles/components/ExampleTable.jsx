import React from 'react';
import styles from '../Articles.css';

const ExampleTable = () => (
    <table style={styles.exampleTable}>
        <tbody>
            <tr>
                <td style={styles.tableData}>Loan Amount</td>
                <td style={styles.tableData}>$3,000</td>
            </tr>
            <tr>
                <td style={styles.tableData}>Lending Period</td>
                <td style={styles.tableData}>48 months</td>
            </tr>
            <tr>
                <td style={styles.tableData}>Payment Frequency</td>
                <td style={styles.tableData}>Monthly</td>
            </tr>
            <tr>
                <td style={styles.tableData}>APR</td>
                <td style={styles.tableData}>27.00%</td>
            </tr>
            <tr>
                <td style={styles.tableData}>Pmt</td>
                <td style={styles.tableData}>$163.14</td>
            </tr>
            <tr>
                <td style={styles.tableData}>Total Cost</td>
                <td style={styles.tableData}>3,915.38</td>
            </tr>
            <tr>
                <td style={styles.tableData}>Origination Fee</td>
                <td style={styles.tableData}>Varies between lenders</td>
            </tr>
        </tbody>
    </table>
);

export default ExampleTable;