#include<iostream>
#include<sstream>
#include<string>
using namespace std;
int main(){
    string input;
    getline(cin, input);
    stringstream ss(input);
    int a, b;
    char comma;
    ss >> a >> comma >> b;
    cout << a + b << endl;
    return 0;
}