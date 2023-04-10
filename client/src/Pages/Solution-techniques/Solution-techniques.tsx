import { Card, Text, Group, Badge, createStyles, Button, rem } from '@mantine/core';
import { Link } from "react-router-dom";
import "./Solution-techniques.css"

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    imageSection: {
        padding: theme.spacing.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },

    label: {
        marginBottom: theme.spacing.xs,
        lineHeight: 1,
        fontWeight: 700,
        fontSize: theme.fontSizes.xs,
        letterSpacing: rem(-0.25),
        textTransform: 'uppercase',
    },

    section: {
        padding: theme.spacing.md,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },

    icon: {
        marginRight: rem(5),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
    },

}));


const SolutionTechniques = () => {
    const { classes } = useStyles();

    return (
        <div className='st-main'>
            <div className='st-head'>
                <u><h4><b>Solution Techniques</b></h4></u>
            </div>
            <div className='st-child1'>
                <Card withBorder radius="md" className={classes.card}>
                    {/* <Card.Section className={classes.imageSection}>
                        <Image src="https://media.geeksforgeeks.org/wp-content/uploads/bisection.jpg" width="70%" alt="bisection" />
                    </Card.Section> */}

                    <Group position="apart" mt="md">
                        <div>
                            <Text fw={700} fz="lg">Cramer's Rule</Text>
                            <Text fz="s" c="dimmed">
                                Part of solution techniques
                            </Text>
                        </div>
                        <Badge variant="gradient" gradient={{ from: 'orange', to: 'yellow' }}>Solution Techniques</Badge>
                    </Group>

                    <Card.Section className={classes.section} mt="md">
                        {/* <Text fz="sm" c="dimmed" className={classes.label}>
                            2 initial values
                        </Text> */}
                    </Card.Section>

                    <Card.Section className={classes.section}>
                        <Group spacing={30}>
                            <Button radius="xl" style={{ flex: 1 }} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                                <Link to="/cramer">Cramer's Rule {'>'}</Link>
                            </Button>
                        </Group>
                    </Card.Section>
                </Card>
                <Card withBorder radius="md" className={classes.card}>
                    {/* <Card.Section className={classes.imageSection}>
                        <Image src="https://media.geeksforgeeks.org/wp-content/uploads/falsepos.jpg" width="73.5%" alt="falseposition" />
                    </Card.Section> */}

                    <Group position="apart" mt="md">
                        <div>
                            <Text fw={700} fz="lg">Gauss Elimination</Text>
                            <Text fz="s" c="dimmed">
                                Part of solution techniques
                            </Text>
                        </div>
                        <Badge variant="gradient" gradient={{ from: 'orange', to: 'yellow' }}>Solution Techniques</Badge>
                    </Group>

                    <Card.Section className={classes.section} mt="md">
                        {/* <Text fz="sm" c="dimmed" className={classes.label}>
                            2 initial values
                        </Text> */}
                    </Card.Section>

                    <Card.Section className={classes.section}>
                        <Group spacing={30}>
                            <Button radius="xl" style={{ flex: 1 }} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                                <Link to="/gausseliminate">Gauss Elimination {'>'}</Link>
                            </Button>
                        </Group>
                    </Card.Section>
                </Card>
                <Card withBorder radius="md" className={classes.card}>
                    {/* <Card.Section className={classes.imageSection}>
                        <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAADGCAMAAAAqo6adAAAAjVBMVEX+/v7///8AAACGhoa8vLy/v7/39/fX19ewsLBmZmby8vLf39+KiorQ0ND29vbCwsLr6+ufn5+QkJB8fHx6enrIyMilpaWWlpasrKyBgYHl5eW2trbb29tlZWVycnKtra1ZWVlLS0tCQkJcXFwzMzM9PT1SUlJISEghISE/Pz8UFBQeHh4qKioQEBAuLi6hHRJWAAAUdElEQVR4nO1diYKiuhLlsMu+r4radtszc+fe//+8lwRtARGFoI6vp9pxRITkJFVJVaUqCMJf+kt/6S/9/xHq90F6Zu2AK5XjJI+9a6bhOY6qKIKsmlqhGUrp6q5byrqbpEmnSnVz3bdaX7UrHBiyYXiGpqmyaSiu6ypGTN5T10103y193Zcl8smXdPJnhXloWbmVZ6uo8qtVvljkVbj4+XO7WPwSxVAMt9t0+5FXn2m6+IjyRbBZEKqqRRhFYSXlEqFIigIr+KLyhP3QYIZmeCDtJSuK5jmaISuyYcqxZsqZkq1TP0jXyjrXLS1PJEvypSSTgkCWSNVCSwopVREpNCeFLnak+O3HYi9uxeQ9+Iw+ql9v0SepnJVuq0W2qOjvIqmSrMoiNQskKciDQDrULStTxZeVMitlOY7dmJDruIXrqoZhaCp9N1RSYa5e+IJviLt9ZVmkuapFsiBttE7LoLT0Mst8lxGpgmvHmu26mqYtba2mpW0uCZnmkrBNsRRMzwNlJKgP4aOjlHNLoyrxV0X4+iDMVa9HEYzFa1V4ZoJXfW/86jfv/2+PP//m+L+3/Av47vi/N/8L2P/F/50Jv745/p/fHP/HBPzAi5k5lwkT9D8UBUx22TMdSfPQlP6HsavVBhT+qzcA/pnC/6HD+h+x+PL436bgL6Mlw//j4fiZd+nLuyscHJcc95ui/6EIWNGeKCaPbQAUEnIP8GRKBmkMY7t0OeowRf8HNIPht0Xx0eozPg3FQcPjhqrk6v8p/J8addE/RVEsHswAmW1Tj2tlBWlAXa6oYi78UyT4IHEwiurRMyDUjdCQfxSZ9mnw8D+P/wfew71HgNwsEqYHm6v/tzz4H+49g93hdl5VFL+5Wu/h+OO5b/iDp/+dx/M/e5uvVLzz4C+e4j2GxyXy7XtNsf++Ln6K9xwGT591b8anwT4BP7xoxkKxeanxr4Y/J36e+e8J+IFZ4XMiePz8h0qdtcjX6n+6XD1viS+Ff/be5/X/PxY/EPCYOv33fB35hxDNDv+F8ENYzM38Au/67wPxE/j3WHR4lf4H7gJfwOeL4I/uwPz0vgu+qx+EH9b8Q9/hxi/Q/4Bl3qkgrHjE6jH4gd294BMEzp+OH/C9uxVDEPDg59Kee+7X+2V+P/hkXF3y4J+oPQNq79deTwsg0e7IZKi45L+5eozblyJBV5Cavz7EtKvr7g2Izj+fs6+vJhXPAlbTewa7LGMDuKEZELM1O/Wr6aF5MWVy6FnXvW/dFT6Rf56htYW/yKzqfbVK7Vi70gpYkd7XxERUjytp21ze0qWMbjgqrDvKPiuAT/8NuvwPLJVws/1MS7e4KBG02Qi7YGOi1urwqRb/wQVrmeYP0/v2Ph3/eBq4z3tat4In+9Z+EWSF2tMGVOmGZOIDilVnzeyQaq4boG2O3R8+6X8u/BejZ1gjqHaZ0iSnosMIkImEVILkYKlD0gFtr5eAkyBpLubfW/ZZGXzz3/DqwYEVEinaLUr11AgQfGLPaeT8MoNHkOdLKvxknmvBT+858R0LqcbgbySO1XJ7y+oJawPNr94C3VEPQTtLTwkZ5B0cwPhNIxnkfdngRWB9Nhl+nbu9xlcrF47gf8RHKwwemzZvjh5hfV/oCzEya2GAQ28AzztEMx1+1fi9H19a2saMpnCfW6EhrA2epQBkHE9iTefNUd4jdi/Trd4r9eu+raHxqyABjprRsrqRTXWLYMaowx7lGqrjHVvYo6SyL0uTTdumG7MQBDZTEfzjybCrH5X8Qyx6z64/fKobiHRioMEOzZGTdDyr2IxJC8jP9B9IVfHjUGoS6+aSxlsJ/xJZ35EP5UoVWReJtDd2qmGSP8O0PU8r7DpjVDlQSV+lTF76Wk8SnfytS3KsxOVGFMX9RvbjXZLrub6zKpo8K4WhtSVnojdRJJxFYzOgREl6FDpDzLaM7cLZvCEIz8Y/hAXBqrAiqjy0yERNA67MkOpKyOmgR4WYRn4ht1oUBIGVJnG8rHNk6at+Y6SRJnLqaQCuuAt+v2nnWbz2R25AF8U1bV2KP4V46Aw4GwQuu1qeDX9+jn8B2Tft91o+a/4D9mTKJl8RizfLEJJa0KEfE7JnD4UYBLph/S5jtNUj+hM5LehESGPzSRs4GyMsWSVKH5EjvTlwuWLeWsWd9T+cvU1UkrZpD9l6N5GQOv9jJ8QoiWGkNf7JBedMtu1KWhudFpBTaAoOarIIa6kSTdGn3FbKhC1iG+F88n82/yPWqXjb7UptYKZkTgLtLwJ7STWYkeN/uxRXVA8zny5FXtMULkkD1/g1G8u9TU/aiEBtNaonlDDmmwDO9X8WUAp3kbe+jDVNpfaZT3UyKJpRD8ST+x+WqH3Nd3YaFV+CkelUL2KKIGKHtbeQLA3yA2NP277yl7NJP2XDs6H0GFbd+bL59VGOOfCT8b+h7djptraFEfus58tDOSVpJSyThCI3lsxFkMzpCu8Z/8ZcPR2//qm3bOdyv6CTgV1Hli+PJ9utLgjnPcNHyLn8vxzjXxM+Xd6CZ22L+BBPr0kPCiz+U/DndJI3fu3r/ib6X/og/NZz+F/oxDH/EGPK/Mu9wjI8RPH+pn9dsDXGyG5OU+xtJvxQfxGFtyBzKtLfMnlPuMKSx1RjDP6DUsw+unzzX7f/EaBYMf3Q2VnHBJsHUJ+PqWFynVRW+j/NtDlOhKbCqf+18RtVkVPw9PbZP2550fcxM/Xp/0stPhqFSZnJMvPMm1pJ94qBtq6d9yxwfIr+fyS9eaASqw9euamgCo7giOLnnf3eX2DP+R/6wns/9LIhGOwTGZqJJk7xx3ltjzHFGaHp+ks/8ZPEb1KaWmkaRcFuFyzyXRVWYZiH0oGImZtblbRdVIuVtUukgJjGe4LfJv828rpMEvlDFO+24tvFf97/RCX+hM8qECaBQvuf8GecMvwRtfzCDDX+nFj2ma4Tfo0L2dQ0s01FQTR20xMMVT3K0he5zQOPGvyIkwM/efuqeswE0Iffgp45tY11lH+oP5ag3j7yz7eX1O/zQe2BMfzfKaUh/zBzI2q6eoiFKeyyRzRAz/iHT53MxXHLtYl1uXOhmwQ2Mcpo5wnBbOMf6NDXikOBQ26cWA/QAc/lH1rKVJCgIYFQ91j61P6VZVop1xNqJ+AVR9yls2jiZ5Z1pyUZY2nifWKeWgWV3f5HQA1Qux1zQcZmg3lfM+qSLNK0xnYFf1vHPX3tUtE54ofpC+hyEjvE8pNHOb+JYJ1lzw7Zv18nD7b7oCMGvtHx3x4OqNvkiJ9ofcK5JNWHMH/dWwTG6b9nVw/6f2h0iKor5bEEGD+ULe1RpMUxjxFqLeW9+EkDrO7cAHxLrBhSU9neeljY8TFmH/iHZutS71JywE+3UqjP9eIncvfffbfaQMbjSh0c/2Ez/CgtZPUkKvv48Awyfxzxn+IdLuAnHPCja3T1lMSBIOHCP2ilgzCvadEV9j08OqiGseZT4DSkieKH8YX6En4yHZ0SftCvFIJDhCGN4f8z+3dw/CetQ7rcJbK+gffJZMFmAx9TJMl/3mn4vIifaNzHBiAzxfl4yr7vn2duQpSNwH9a/z0M31fwOz62zFZYQSVcX2fLkytTOuEpaMaeXcZPmnFzmHsWVDWGfZwUofo284RjekbgKPu3OK1HwqPq6ZWCITgpG+8TlqetubUhWd80cFqLp52V1JZivduzUZKxjVUp719VEr2NRu88fRLrCa+DWcbHyXmXVxJbIYWmWMtcJQK9Kuu9b35DmGr/OqohEIuvUMvNu2AwckLHMOhic+EVhLyI/VeTV4kiHT5otjFWBZlFXLZkBC0hh2rM1qOm4k/O9R93L2zMg2QZheGwL0UyiG2oL/4DFTPdavvPV4i16xMLmJjAXxRkq+BjkX68vf1crbaL3W6xW7BNmQltyN/blq7wiukP8lZJzALOPrPahk6J8Zym/jaV7biwbWZF5rU7kPX/L6KIEwkCNUoj09nTHSxpLNVU/Po5/lTGyjBYr1NUPovU+B1LDL+sYCMk/sH+90l/0RclwzuS4RlHAtR+HhDFN8BYi8fjvH3aah1pPlsVCcnHlZASqXM10QN+ZXRdRAJHED/Kc/wVzBClctR0a04QTbA1uBVcX3HjgCWOI7nG6v2TM03mSYRmCGwnkrg9HJIGWLB9pon9VTog7SDDJV+zcZH8NJvuLOnDL5pEX3GVVg30eGHBJIz/7toIYk9ia5CYZqMTnu0mXnQiydsTC/wV3tkKmEeDoeHRZWDAZkaSl4BjQQzrM/vPpGsvUNr493TypWY/ddJquqywyzBpJRJCxBi+9d3HUP+/izBpAx2Zsb0exqX/nfU/VU6FM/wO05OBmDpmEbuHsqfgZ3NdV3UY6n86WMSIuPY5uliZ8tz/2WjcxpfoOTkFP+qQu47q0LEk2/i11acPVbxL/p/LZf+Nx096n+lv3Ujn98v4CW668CDfY6+xc/kfdfX48Q+7Q8h3B/+ufdh2rNTGIleqzqXq8Nl/o/v/CP+M/z+v4zfvkG1F9Rmeq8ddjFO6SSfxoNscPfjJGDn/Zmvn/s9RV4/Dj0a0UXf8Dwebo8bvzb8qTEPxea4eczGawaZdhJ1Dvwc/mSR4mLW/TgpX/tMY/KCBpaejTofn1/v/HvvNQXnU+EeYv6mmDzg8BGZY9JWDaMbQt/qOLs9K+wj8OKyofh0P48/68c/OAHCn+87G4Ed3oWUSfsIAM+fBw+VRq2/GD6QdG/UKfvkC/uVubvw8gWa344+6w+w0/HT9fdYGeAz/92TZTuN/Aelsoe/1/R6Bv9fJPBE/54Z9Z9V4AH4EPTrGOP4/6T3YzxoZBJcnzOQm/PD7QkzH4T8NUigurrn3Oi6uVS7m2U3xFvwXJHYc/kYn4VJkHFTmsjZHuUl41s5oNa+G6V0asCbjP27/LAiN1Sn2MaqPRyWHQOPj/2sBKhfH63H4O+rwUnWoP1zJsiRh/QddE3wbS1kooY9a0Y355v8r+OFfqsxU+adHTuV7dCnYtWO6xEIHRWOn7QF1pcsYl5Rqr+6IH/5F7hqHv+MsU98Nug4QyJkis5UxEe8sWywIzvZQuIKg4OJ/ZXAyQnL55uPwd7fFYI4AMhIe88nfSoNtjGrl5G1MdiwUnlzaYesZ+sDZLuA+h9fpsDNJHVa8jisfUNMPIvxlkdL4olF7ZcHjyaWDPeCQgT5kWkFqH+Yj+p/mA3Z+TZ3DKQ0rhDPqcRiweXIpEV/GT5eRhy7lGP/kTp9hqet0PZwtVI/zZ3H2v3JxrrkCn2v8O9NwjvpA37lh4tT/4ksSDvnKLAypNXWM4v8ZiW8L+4v8f8ai57+Q1BH47/aYGWg8TXtp/IN2Vao6Ozp2Hb5trZwjwOtaNQwu/a8fP+TrTrVO4kUXf0fhnZ5ncK0aJpf+14sf9g02VRd/R8NbPwq/wbMBaJ2nf/blLbXt4u+EwwSPwq/yZBr24cfyJo2i4xXpAn4cfi75P8eP+DaDAlkbf/ks/Fzyf4Yf9o3t2Qm8QftGXYX3bvg5H4DVxQ/zVnGCrg3xv/+o/ud6hEsXP/Wm3Ip/eP6LHoXf49J/2vhvUHtOv9Xb+JMnyb/BE1XVxt9I57jh0rSNv8Pwi4fh59kAvoUf3phadsf/QYfHK4x/sMc5njvj/7DD48/HTzOcRuFXBvGHD8PP8wCYE34YI020K/gHvSNz0jz44Y1Vo/8Y/FwPwDvghzfaihqHn+spDcP12PLjn2JEjcPP9ZSm4Xrwz3/0MYh3xs/1lL7hevDEUzD8ZOibEJn/x/A/7/gHI58SkjRu/puqpONq1fgegErwO9PC8h8y/iMpcKUJ+B6Aq7lTZJ9dSvE3EuWUofw/lvk7hWiW5XBAyNkDkEfd3wys6z/qJ1cDCk0obMHxbE3zNbtB2iImpPt+yfZTSsSEbqrkB+wt9aXQCsMwWkdJluhKIstrWc5k2Vf8bC2tFlW2WkQV+YUkUqqGglTwb8eDYTTrYStKbK/LklRFbmzvxHJUaZpqINLPUhqmUWCR/6IypSEZ8pH8TEmCXA9WK2u1WIU5JelEYSSFlZSHURSFVZokvq7riU6prN9L8ip1myaVmqrjkBd5U8mLEeqNtAe67N9fLFl3qP878g97rfcRrYlelEVcFLFaHCpgbGVBPRH5PFSZ2enqtAPdGUbfM/+NKF+tTLlbpRup/dvOlT2Hk8f/q7/4OXX8gxFiOdF7jFRuSCW5k9xY4YP5Xja8slB+2P/ebReU6fovQhXLiYoJVrHbeJQrYcLVacNlmD/REFuUKcTl5LDnK8wzVf8D3d0EzlT8G7rR79FhQhfMFkZ5ZAHEMlaCdHwyG92i8APriX46lEIxlOI0EX/9KFqo0xQTmrpNrj8WjXApEG44IiQqaUnGlfXBQYY3L3TWS3ta4DfiD3soJKSTeHnrXbFi23ePt3vry4Mq805brEMsfRq8dwhcgugWp4c/0D2CaO6QNi31B/RxBUPnp/Q/hKDe/3ui/DN97uR6o6JE7mkenAkaVSmRaXWAABK6U7xXTuN/wB62HafhP4xdE/FD3dKd0YzNIRXYpb4z5McOp4vqBLDeDJDofTTcLSWJTjbYcpcfYTR840OtpkVPob3HXCdwvb3HXKvAKSVdsX9ufYRN78WjXP5/JPHZv8Lr4/+PC8Hr45+s/zJ6ffxc+VR3dMw/iP7i/4uf4+r5nsTzJALfJsOvDv+OodWvQVz6z/8B4S7bSr0OzZxP/XL0F/93xz/zjiIvRn/Hvwc9aeYPpafJP77enkrPws82bR2ZrHmXejxH/mlGKwDtQY85GqjIU+SfPl0Gicmzc/NcNZl5Q6UbS93TjXw+vXqz3WfSk/p/Aaj2dsm3/cQsNXl/Sv9/ABtUZr2H9TOJPcf78aWS/hdXq6DxRMUnEfbPGP9p2o1KA5nulth8c03+fcocjMKjK3MPesrpUEWe0v9fa57PKLpF+Hi2BD6XsON5APDr08z76b0I/Q/RRvxBC+9gFwAAAABJRU5ErkJggg=="
                            width="77.3%"
                            alt="onepointiteration" />
                    </Card.Section> */}

                    <Group position="apart" mt="md">
                        <div>
                            <Text fw={700} fz="lg">Gauss-Jordan</Text>
                            <Text fz="s" c="dimmed">
                                Part of solution techniques
                            </Text>
                        </div>
                        <Badge variant="gradient" gradient={{ from: 'orange', to: 'yellow' }}>Solution Techniques</Badge>
                    </Group>

                    <Card.Section className={classes.section} mt="md">
                        {/* <Text fz="sm" c="dimmed" className={classes.label}>
                            Single initial value
                        </Text> */}
                    </Card.Section>

                    <Card.Section className={classes.section}>
                        <Group spacing={30}>
                            <Button radius="xl" style={{ flex: 1 }} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                                <Link to="/gaussjordan">Gauss-Jordan {'>'}</Link>
                            </Button>
                        </Group>
                    </Card.Section>
                </Card>
            </div>
            <br />
            <div className='st-child2'>
                <Card withBorder radius="md" className={classes.card}>
                    {/* <Card.Section className={classes.imageSection}>
                        <Image src="https://i0.wp.com/curiosityfluids.com/wp-content/uploads/2016/03/newtonraphson.png?resize=551%2C413&ssl=1"
                            width="65%"
                            alt="newtonraphson" />
                    </Card.Section> */}

                    <Group position="apart" mt="md">
                        <div>
                            <Text fw={700} fz="lg">Matrix Inversion</Text>
                            <Text fz="s" c="dimmed">
                                Part of solution techniques
                            </Text>
                        </div>
                        <Badge variant="gradient" gradient={{ from: 'orange', to: 'yellow' }}>Solution Techniques</Badge>
                    </Group>

                    <Card.Section className={classes.section} mt="md">
                        {/* <Text fz="sm" c="dimmed" className={classes.label}>
                            Single initial value
                        </Text> */}
                    </Card.Section>

                    <Card.Section className={classes.section}>
                        <Group spacing={30}>
                            <Button radius="xl" style={{ flex: 1 }} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                                <Link to="/matrixinversion">Matrix Inversion {'>'}</Link>
                            </Button>
                        </Group>
                    </Card.Section>
                </Card>
                <Card withBorder radius="md" className={classes.card}>
                    {/* <Card.Section className={classes.imageSection}>
                        <Image src="https://pythonforundergradengineers.com/posts/functions/images/taylor.png"
                            width="83%"
                            alt="taylorseries" />
                    </Card.Section> */}

                    <Group position="apart" mt="md">
                        <div>
                            <Text fw={700} fz="lg">LU Decomposition</Text>
                            <Text fz="s" c="dimmed">
                                Part of solution techniques
                            </Text>
                        </div>
                        <Badge variant="gradient" gradient={{ from: 'orange', to: 'yellow' }}>Solution Techniques</Badge>
                    </Group>

                    <Card.Section className={classes.section} mt="md">
                        {/* <Text fz="sm" c="dimmed" className={classes.label}>
                            Single initial value
                        </Text> */}
                    </Card.Section>

                    <Card.Section className={classes.section}>
                        <Group spacing={30}>
                            <Button radius="xl" style={{ flex: 1 }} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                                <Link to="/ludecomposition">LU Decomposition {'>'}</Link>
                            </Button>
                        </Group>
                    </Card.Section>
                </Card>
                <Card withBorder radius="md" className={classes.card}>
                    {/* <Card.Section className={classes.imageSection}>
                        <Image src="https://cdn1.byjus.com/wp-content/uploads/2022/04/secant-method-2.png"
                            width="83%"
                            alt="secant" />
                    </Card.Section> */}

                    <Group position="apart" mt="md">
                        <div>
                            <Text fw={700} fz="lg">Cholesky Decomposition</Text>
                            <Text fz="s" c="dimmed">
                                Part of solution techniques
                            </Text>
                        </div>
                        <Badge variant="gradient" gradient={{ from: 'orange', to: 'yellow' }}>Solution Techniques</Badge>
                    </Group>

                    <Card.Section className={classes.section} mt="md">
                        {/* <Text fz="sm" c="dimmed" className={classes.label}>
                            2 initial values
                        </Text> */}
                    </Card.Section>

                    <Card.Section className={classes.section}>
                        <Group spacing={30}>
                            <Button radius="xl" style={{ flex: 1 }} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                                <Link to="/cholesky">Cholesky Decomposition {'>'}</Link>
                            </Button>
                        </Group>
                    </Card.Section>
                </Card>
            </div>
            <br/>
            <div className='st-child3'>
                <Card withBorder radius="md" className={classes.card}>
                    {/* <Card.Section className={classes.imageSection}>
                        <Image src="https://i0.wp.com/curiosityfluids.com/wp-content/uploads/2016/03/newtonraphson.png?resize=551%2C413&ssl=1"
                            width="65%"
                            alt="newtonraphson" />
                    </Card.Section> */}

                    <Group position="apart" mt="md">
                        <div>
                            <Text fw={700} fz="lg">Jacobi Iteration</Text>
                            <Text fz="s" c="dimmed">
                                Part of solution techniques
                            </Text>
                        </div>
                        <Badge variant="gradient" gradient={{ from: 'orange', to: 'yellow' }}>Solution Techniques</Badge>
                    </Group>

                    <Card.Section className={classes.section} mt="md">
                        {/* <Text fz="sm" c="dimmed" className={classes.label}>
                            Single initial value
                        </Text> */}
                    </Card.Section>

                    <Card.Section className={classes.section}>
                        <Group spacing={30}>
                            <Button radius="xl" style={{ flex: 1 }} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                                <Link to="/jacobi">Jacobi Itertion {'>'}</Link>
                            </Button>
                        </Group>
                    </Card.Section>
                </Card>
                <Card withBorder radius="md" className={classes.card}>
                    {/* <Card.Section className={classes.imageSection}>
                        <Image src="https://pythonforundergradengineers.com/posts/functions/images/taylor.png"
                            width="83%"
                            alt="taylorseries" />
                    </Card.Section> */}

                    <Group position="apart" mt="md">
                        <div>
                            <Text fw={700} fz="lg">Gauss-Seidel Itertion</Text>
                            <Text fz="s" c="dimmed">
                                Part of solution techniques
                            </Text>
                        </div>
                        <Badge variant="gradient" gradient={{ from: 'orange', to: 'yellow' }}>Solution Techniques</Badge>
                    </Group>

                    <Card.Section className={classes.section} mt="md">
                        {/* <Text fz="sm" c="dimmed" className={classes.label}>
                            Single initial value
                        </Text> */}
                    </Card.Section>

                    <Card.Section className={classes.section}>
                        <Group spacing={30}>
                            <Button radius="xl" style={{ flex: 1 }} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                                <Link to="/gaussseidel">Gauss-Seidel Itertion {'>'}</Link>
                            </Button>
                        </Group>
                    </Card.Section>
                </Card>
                <Card withBorder radius="md" className={classes.card}>
                    {/* <Card.Section className={classes.imageSection}>
                        <Image src="https://cdn1.byjus.com/wp-content/uploads/2022/04/secant-method-2.png"
                            width="83%"
                            alt="secant" />
                    </Card.Section> */}

                    <Group position="apart" mt="md">
                        <div>
                            <Text fw={700} fz="lg">Conjugate Gradient</Text>
                            <Text fz="s" c="dimmed">
                                Part of solution techniques
                            </Text>
                        </div>
                        <Badge variant="gradient" gradient={{ from: 'orange', to: 'yellow' }}>Solution Techniques</Badge>
                    </Group>

                    <Card.Section className={classes.section} mt="md">
                        {/* <Text fz="sm" c="dimmed" className={classes.label}>
                            2 initial values
                        </Text> */}
                    </Card.Section>

                    <Card.Section className={classes.section}>
                        <Group spacing={30}>
                            <Button radius="xl" style={{ flex: 1 }} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                                <Link to="/conjugate">Conjugate Gradient {'>'}</Link>
                            </Button>
                        </Group>
                    </Card.Section>
                </Card>
            </div>


        </div>

    );
}

export default SolutionTechniques;