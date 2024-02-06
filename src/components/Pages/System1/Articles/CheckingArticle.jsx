import React from 'react';
// import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
// import ButtonContainer from '../ButtonContainer';
import ArticleTitle from './components/ArticleTitle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

const ContentText = ({title, text}) => (
    <div style={styles.contentText}>
        {!!title && <b style={styles.boldText}>{`${title} - `}</b>}{text}
    </div>
);

const CheckingTable = () => {
    const columns = [
        { id: 'id', label: '', minWidth: 60, align: 'left' },
        { id: 'name', label: 'Bank', minWidth: 200, align: 'left' },
        { id: 'value', label: 'Bonus Offer', minWidth: 100, align: 'right' },
    ];
    function createData(id, name, value) {
        return { id, name, value};
    };

    const rows = [
        createData('1', 'Chase (Private Client)', '$3,000 bonus'),
        createData('2', 'Wells Fargo', '$2,500 bonus'),
        createData('3', 'Citibank', 'Up to $2,000 bonus'),
        createData('4', 'Huntington National Bank', 'Up to $600 bonus'),
        createData('5', 'BMO', 'Up to $400 bonus'),
        createData('6', 'PNC Bank', 'Up to $400 bonus'),
        createData('7', 'Axos Bank', '$300 bonus'),
        createData('8', 'SoFi', 'up to $300 bonus'),
        createData('9', 'Chase Bank', 'up to $200 bonus; $100 bonus for college students'),
        createData('10', 'KeyBank', '$200 bonus'),
        createData('11', 'M&T Bank', 'Up to $200 bonus'),
        createData('12', 'Bank of America', '$200 bonus')
    ];

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    return(
        <Paper sx={{ width: '100%', overflow: 'hidden', maxWidth: 800 }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => {
                        return (
                            <StyledTableRow key={row.id}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                        {value}
                                    </TableCell>
                                );
                            })}
                            </StyledTableRow>
                        );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
};
const CheckingArticle = () => {
    // const { trackingState } = useContext(AppContext);
    return(
        <div style={styles.mainConatiner}>
            <div style={{...styles.contentContainer, display:'flex', justifyContent: 'center', alignContent:' flex-start'}}>
                <CheckingTable />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Mobile Deposit"/>                
                <ContentText text='If you can take a picture with your mobile phone, you can deposit a check.  Mobile deposit, which is offered by most online checking providers, makes depositing a check as easy as taking a selfie. Just select the appropriate account and enter the dollar value of the check. Then simply position the check within the capture field, and voila!  The app takes care of the rest. In fact, now you have an image of the check for your records. This feature alone makes online checking one of the most convenient ways to manage your funds.' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="It’s FREE… No Monthly Fees & Free ATMs"/>                
                <ContentText text='Although it may not be universally true, most online checking account providers have no monthly fees and no account balance minimums.  Sure, your current brick and mortar bank may only charge $5.95/month, but all this adds up!  Why pay someone to hold YOUR money…especially since they are earning a return on it!  To sweeten the deal, many online checking providers have 100% FREE ATM withdrawals and will reimburse you for any fees you might incur domestically or abroad if you are charged for taking out money.  Many people, unknowingly spend $100s each year on these types of fees.  Stop throwing your hard earned money away.' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Say Goodbye to Penalties and Overdraft Fees"/>                
                <ContentText text='Have you every overdrawn your account by $3 and received an overdraft fee of $35.  How frustrating is that!  At some point this has probably happened to us all.  Well you can now say goodbye bank fees and penalties.  Many online checking providers have overdraft protection built into their checking accounts as a standard feature.' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Account Snapshots"/>                
                <ContentText text='Mobile applications make it so easy to check your account balances and monitor current transactions.  In fact, most online checking accounts and their associated applications have intuitive dashboards that provide all your most important banking elements into 1, easy to view summary screen.  In addition, most apps allow you to do everything you could do with a desktop computer like transferring money and using online bill pay.' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Biometric Login & Face ID"/>                
                <ContentText text='If you’re like everybody else, you have a whole slew of passwords for different sites.  As a result, you probably have trouble remembering your password from time to time. Fortunately, technology has found a way to make password management simple and easy. Many online checking providers have applications that allow you to log into their app with your supported iOS and Android device’s fingerprint or facial recognition abilities. Convenience with increased security – sounds like a win-win!' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Samsung Pay & Apple Pay"/>                
                <ContentText text='Have you every forgotten your wallet on your way to a restaurant or a night out with friends?  This can make for an awkward moment when it’s time to settle your bill at the end of the evening!  The good news is Samsung Pay and Apple Pay provide you with a proverbial “belt and suspenders” as more and more merchants allow you to pay with your phone.  It’s extremely simple and easy to connect your bank account to Samsung Pay and Apple Pay.  Once completed, paying your bill is as easy as holding your phone near the credit card terminal in conjunction with a passcode or biometric input like your thumbprint.' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Card Management and Fraud/Theft Protection"/>                
                <ContentText text='With many of the new mobile phone applications provided with online checking accounts, managing your card accounts has become as simple as a “click”.  Mobile applications now allow you to freeze, replace, or report your debit or credit card lost or stolen.  Ultimately this is more convenient than having to log into a desktop banking portal and can be done 24/7 from anywhere in the world where you have internet access.' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Wrapping Things Up"/> 
                <ContentText text="In conclusion, there are so many reasons for the majority of us to open an online checking account.  It’s convenient, secure and could potentially save you $100s in fees on an annual basis.  In addition, these types of checking accounts leverage some of the latest technologies which make managing your funds, paying bills, paying friends and preventing fraud easier than ever before.  I know, stepping away from something that exists in the physical world and is familiar can be a scary proposition.  Remember this, your money is still stored electronically as “1s” and “0s” whether you use an online banking provider or go to a physical location. So do yourself a favor and cut out the middle man." />
            </div>
        </div>
    );
};

export default CheckingArticle;