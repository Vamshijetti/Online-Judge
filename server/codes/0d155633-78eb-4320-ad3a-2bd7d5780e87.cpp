#include<iostream>
#include<sstream>
#include<string>
using namespace std;
int main(){
    string input;
    getline(cin, input);
    stringstream ss(input);
    int a, b, c;
    char comma;
    ss >> a >> comma >> b >> comma >> c;
    cout << a + b + c << endl;
    return 0;
}